"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/navigation/MobileMenu";

/** Sticky site header with desktop links and a mobile drawer menu. */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-surface/90 sticky top-0 z-40 border-b backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="text-charcoal flex items-center gap-2 text-base font-bold tracking-tight"
        >
          <Logo className="text-charcoal h-8 w-8" />
          {SITE_NAME}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-charcoal text-white"
                      : "text-text-muted hover:bg-surface-muted hover:text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <MobileMenu pathname={pathname} />
      </nav>
    </header>
  );
}
