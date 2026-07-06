import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the UNSW Co-op Society committee — questions, sponsorship enquiries, and collaboration opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Questions about the society, sponsorship enquiries, or just want to
            say hello — we&apos;d love to hear from you.
          </p>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <aside aria-label="Other ways to reach us">
              <div className="border-border bg-surface-muted rounded-2xl border p-6">
                <h2 className="text-charcoal text-lg font-bold">
                  Other ways to reach us
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-charcoal font-medium underline-offset-4 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  <li>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal font-medium underline-offset-4 hover:underline"
                    >
                      Instagram @unswcoopsoc
                    </a>
                  </li>
                  <li>
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal font-medium underline-offset-4 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
                <p className="text-text-muted mt-6 text-sm leading-relaxed">
                  We usually respond within a few business days during semester.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
