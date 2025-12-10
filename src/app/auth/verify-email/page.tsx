"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/shared/button";
import { useSession } from "next-auth/react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("No verification token provided");
      return;
    }

    // Verify the token
    fetch(`/api/verify-email?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.message.includes("success") ||
          data.message.includes("already verified")
        ) {
          setStatus("success");
          setMessage(data.message);
          // Redirect to dashboard if logged in, otherwise login page
          setTimeout(() => {
            if (session) {
              router.push("/dashboard");
            } else {
              router.push("/auth/login");
            }
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage("Failed to verify email. Please try again.");
      });
  }, [searchParams, router, session]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center">
          {/* Logo */}

          <Logo className="justify-center mb-8" iconSize={24} />

          {/* Status Icon */}
          <div className="mb-6">
            {status === "loading" && (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full ">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            )}
            {status === "error" && (
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">
            {status === "loading" && "Verifying your email..."}
            {status === "success" && "Email verified!"}
            {status === "error" && "Verification failed"}
          </h1>

          {/* Message */}
          <p className="mb-8">{message}</p>

          {/* Actions */}
          {status === "success" && (
            <div className="space-y-3">
              <p className="text-sm text-muted">
                Redirecting to {session ? "dashboard" : "login page"}...
              </p>
              <Link
                href={session ? "/dashboard" : "/auth/login"}
                className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 text-white text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors"
              >
                Go to {session ? "Dashboard" : "Login"}
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <Link href="/auth/register">
                <Button variant="primary">Register Again</Button>
              </Link>

              <div>
                <Link
                  href="/"
                  className="text-sm hover:opacity-80 transition-opacity"
                >
                  <Button variant="secondary">Back to Home</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
