import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-surface">
      <Container className="py-32 text-center">
        <p className="text-text-muted text-sm font-semibold tracking-wide uppercase">
          404
        </p>
        <h1 className="text-charcoal mt-2 text-4xl font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="text-text-muted mx-auto mt-4 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/events" variant="ghost">
            Browse events
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
