interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/** Consistent heading block used at the top of every page section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="text-text-muted mb-2 text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-charcoal text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-text-muted mt-4 text-base leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
