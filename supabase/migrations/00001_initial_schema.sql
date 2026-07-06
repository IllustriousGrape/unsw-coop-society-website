-- UNSW Co-op Society — initial schema.
-- Run via the Supabase SQL editor or `supabase db push`.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

-- Keep updated_at accurate on every write.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- True when the current user is a committee admin. SECURITY DEFINER so RLS
-- policies can call it without recursing into the profiles policy.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  is_admin boolean not null default false,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create a profile automatically when a user first signs in.
-- Admin access is granted manually by setting is_admin = true.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.committee (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  degree text not null,
  year text not null,
  biography text not null,
  linkedin_url text,
  email text,
  term text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  banner_url text,
  description text not null,
  agenda text,
  category text not null check (
    category in ('social', 'professional', 'charity', 'networking', 'academic')
  ),
  starts_at timestamptz not null,
  ends_at timestamptz,
  venue text not null,
  registration_url text,
  is_published boolean not null default false,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index events_starts_at_idx on public.events (starts_at desc);
create index events_category_idx on public.events (category);

create table public.event_images (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index event_images_event_id_idx on public.event_images (event_id);

create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text not null,
  category text not null check (
    category in ('events', 'social', 'professional', 'community')
  ),
  width integer not null,
  height integer not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  description text not null,
  website_url text,
  industry text not null,
  partnership_info text,
  tier text not null default 'supporting' check (
    tier in ('principal', 'major', 'supporting')
  ),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  body text not null,
  cover_url text,
  published_at timestamptz,
  is_published boolean not null default false,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (
    category in ('resume', 'interview', 'scholarship', 'career', 'general')
  ),
  file_url text,
  external_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- updated_at triggers for every table.
do $$
declare
  t text;
begin
  foreach t in array array[
    'profiles', 'committee', 'events', 'event_images', 'gallery',
    'sponsors', 'news', 'resources', 'contact_messages', 'settings'
  ]
  loop
    execute format(
      'create trigger set_updated_at before update on public.%I
       for each row execute function public.set_updated_at()',
      t
    );
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Public content is readable by anyone; all writes require a committee
-- admin. contact_messages accepts no anonymous reads or writes — the
-- contact form inserts via the service role on the server.

alter table public.profiles enable row level security;
alter table public.committee enable row level security;
alter table public.events enable row level security;
alter table public.event_images enable row level security;
alter table public.gallery enable row level security;
alter table public.sponsors enable row level security;
alter table public.news enable row level security;
alter table public.resources enable row level security;
alter table public.contact_messages enable row level security;
alter table public.settings enable row level security;

-- profiles: users see their own profile; admins see all.
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid() and is_admin = (
    select p.is_admin from public.profiles p where p.id = auth.uid()
  ));

-- Public-read tables: anonymous visitors only see published/active rows;
-- admins see and manage everything.
create policy "committee_public_read" on public.committee
  for select using (is_active or public.is_admin());
create policy "committee_admin_write" on public.committee
  for all using (public.is_admin()) with check (public.is_admin());

create policy "events_public_read" on public.events
  for select using ((is_published and deleted_at is null) or public.is_admin());
create policy "events_admin_write" on public.events
  for all using (public.is_admin()) with check (public.is_admin());

create policy "event_images_public_read" on public.event_images
  for select using (true);
create policy "event_images_admin_write" on public.event_images
  for all using (public.is_admin()) with check (public.is_admin());

create policy "gallery_public_read" on public.gallery
  for select using (is_published or public.is_admin());
create policy "gallery_admin_write" on public.gallery
  for all using (public.is_admin()) with check (public.is_admin());

create policy "sponsors_public_read" on public.sponsors
  for select using (is_active or public.is_admin());
create policy "sponsors_admin_write" on public.sponsors
  for all using (public.is_admin()) with check (public.is_admin());

create policy "news_public_read" on public.news
  for select using ((is_published and deleted_at is null) or public.is_admin());
create policy "news_admin_write" on public.news
  for all using (public.is_admin()) with check (public.is_admin());

create policy "resources_public_read" on public.resources
  for select using (is_published or public.is_admin());
create policy "resources_admin_write" on public.resources
  for all using (public.is_admin()) with check (public.is_admin());

-- contact_messages: admin-only. Inserts happen server-side via the
-- service role, which bypasses RLS, so no anon insert policy is needed.
create policy "contact_messages_admin_read" on public.contact_messages
  for select using (public.is_admin());
create policy "contact_messages_admin_update" on public.contact_messages
  for update using (public.is_admin()) with check (public.is_admin());
create policy "contact_messages_admin_delete" on public.contact_messages
  for delete using (public.is_admin());

create policy "settings_public_read" on public.settings
  for select using (true);
create policy "settings_admin_write" on public.settings
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: public media bucket for admin uploads.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media_admin_insert" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_admin());
create policy "media_admin_update" on storage.objects
  for update using (bucket_id = 'media' and public.is_admin());
create policy "media_admin_delete" on storage.objects
  for delete using (bucket_id = 'media' and public.is_admin());
