import "server-only";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

/**
 * Ensures the current request is from a signed-in committee admin.
 * Redirects to /login otherwise. Returns the admin's profile.
 */
export async function requireAdmin(): Promise<Profile> {
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_admin) {
    redirect("/login?error=not_authorised");
  }

  return profile as Profile;
}
