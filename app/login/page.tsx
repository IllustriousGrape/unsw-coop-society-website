import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GoogleSignInButton } from "@/components/forms/GoogleSignInButton";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Committee Login",
  description: "Sign in to the UNSW Co-op Society admin dashboard.",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

const ERROR_MESSAGES: Record<string, string> = {
  auth_failed: "Sign-in failed. Please try again.",
  not_authorised:
    "Your account doesn't have committee access. Contact the President or IT Director if you believe this is a mistake.",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;
  const configured = isSupabaseConfigured();

  return (
    <section className="bg-surface-muted">
      <Container className="flex min-h-[60vh] items-center justify-center py-20">
        <div className="border-border bg-surface w-full max-w-md rounded-3xl border p-8 text-center sm:p-10">
          <h1 className="text-charcoal text-2xl font-bold">Committee Login</h1>
          <p className="text-text-muted mt-3 text-sm leading-relaxed">
            Restricted to committee members. Sign in with your society Google
            account to manage events, sponsors, and content.
          </p>

          {errorMessage ? (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          ) : null}

          <div className="mt-8">
            {configured ? (
              <GoogleSignInButton />
            ) : (
              <p className="bg-surface-muted text-text-muted rounded-lg px-4 py-3 text-sm">
                Sign-in is unavailable: Supabase is not configured for this
                deployment. See the README for setup instructions.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
