import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { ADMIN_ENTITIES } from "@/lib/admin-config";
import { signOut } from "@/app/admin/actions";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await requireAdmin();

  return (
    <div className="bg-surface-muted">
      <div className="border-border bg-surface border-b">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
          <nav aria-label="Admin navigation">
            <ul className="flex flex-wrap items-center gap-1">
              <li>
                <Link
                  href="/admin"
                  className="text-charcoal hover:bg-surface-muted rounded-full px-3 py-1.5 text-sm font-semibold"
                >
                  Dashboard
                </Link>
              </li>
              {ADMIN_ENTITIES.map((entity) => (
                <li key={entity.table}>
                  <Link
                    href={`/admin/${entity.table}`}
                    className="text-text-muted hover:bg-surface-muted hover:text-charcoal rounded-full px-3 py-1.5 text-sm font-medium"
                  >
                    {entity.plural}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin/messages"
                  className="text-text-muted hover:bg-surface-muted hover:text-charcoal rounded-full px-3 py-1.5 text-sm font-medium"
                >
                  Messages
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-text-muted text-sm">{profile.full_name}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="border-border text-charcoal hover:border-charcoal rounded-full border px-4 py-1.5 text-sm font-medium"
              >
                Sign out
              </button>
            </form>
          </div>
        </Container>
      </div>
      <Container className="min-h-[70vh] py-10">{children}</Container>
    </div>
  );
}
