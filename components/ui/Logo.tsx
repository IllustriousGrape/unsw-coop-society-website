interface LogoProps {
  className?: string;
}

/**
 * The society's four-dot logo mark, drawn with currentColor so it adapts
 * to light (black mark) and dark (white mark) contexts.
 */
export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {/* Top-left: crescent */}
      <path d="M 44.9 20.9 A 17 17 0 1 0 44.9 43.1 A 15 15 0 0 1 44.9 20.9 Z" />
      {/* Top-right: circle */}
      <circle cx="68" cy="32" r="17" />
      {/* Bottom-left: circle */}
      <circle cx="32" cy="68" r="17" />
      {/* Bottom-right: circle with a squared corner */}
      <path d="M 68 51 A 17 17 0 0 0 51 68 A 17 17 0 0 0 68 85 L 85 85 L 85 68 A 17 17 0 0 0 68 51 Z" />
    </svg>
  );
}
