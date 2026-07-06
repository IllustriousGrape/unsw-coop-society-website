import { Container } from "@/components/ui/Container";

/** Route-level loading skeleton shown while server data resolves. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <div className="bg-charcoal">
        <Container className="py-20 sm:py-28">
          <div className="h-12 w-2/3 max-w-md animate-pulse rounded-lg bg-white/10" />
          <div className="mt-6 h-6 w-1/2 max-w-sm animate-pulse rounded-lg bg-white/10" />
        </Container>
      </div>
      <Container className="py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="bg-surface-muted h-72 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
