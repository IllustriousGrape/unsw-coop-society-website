import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  ACKNOWLEDGEMENT_OF_COUNTRY,
  CONTACT_EMAIL,
  NAV_LINKS,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-charcoal border-t text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 text-base font-bold">
              <span
                aria-hidden="true"
                className="bg-primary text-charcoal flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold"
              >
                C
              </span>
              {SITE_NAME}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              The official student society for UNSW Co-op Program scholars.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold tracking-wide text-white/50 uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary text-sm text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white/50 uppercase">
              Connect
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary text-sm text-white/80"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary text-sm text-white/80"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-primary text-sm text-white/80"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm leading-relaxed text-white/60">
            {ACKNOWLEDGEMENT_OF_COUNTRY}
          </p>
          <p className="mt-6 text-sm text-white/50">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
