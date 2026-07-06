"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { logError } from "@/utils/logger";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logError("Unhandled page error", error);
  }, [error]);

  return (
    <section className="bg-surface">
      <Container className="py-32 text-center">
        <p className="text-text-muted text-sm font-semibold tracking-wide uppercase">
          Something went wrong
        </p>
        <h1 className="text-charcoal mt-2 text-4xl font-extrabold tracking-tight">
          We hit an unexpected error
        </h1>
        <p className="text-text-muted mx-auto mt-4 max-w-md">
          Sorry about that. You can try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="ghost">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
