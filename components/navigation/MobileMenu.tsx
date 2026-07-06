"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

interface MobileMenuProps {
  pathname: string;
}

/** Animated drawer navigation shown below the lg breakpoint. */
export function MobileMenu({ pathname }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const prefersReducedMotion = useReducedMotion();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="text-charcoal hover:bg-surface-muted flex h-10 w-10 items-center justify-center rounded-full"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isOpen ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              className="bg-charcoal/40 fixed inset-0 top-16 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              id={menuId}
              aria-label="Mobile navigation"
              className="border-border bg-surface fixed inset-x-0 top-16 z-40 border-b shadow-lg"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <ul className="space-y-1 p-4">
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
                        className={`block rounded-lg px-4 py-3 text-base font-medium ${
                          isActive
                            ? "bg-charcoal text-white"
                            : "text-charcoal hover:bg-surface-muted"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
