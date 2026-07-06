"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { logError } from "@/utils/logger";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (signInError) {
        throw signInError;
      }
    } catch (caught) {
      logError("Google sign-in failed", caught);
      setError("Sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="secondary"
        onClick={signIn}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Redirecting…" : "Continue with Google"}
      </Button>
      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
