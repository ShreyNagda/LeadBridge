"use client";

import { useState } from "react";
import { Button } from "@/components/shared/button";
import { Loader2, Check, AlertCircle } from "lucide-react";

interface ResendVerificationButtonProps {
  email: string;
}

export default function ResendVerificationButton({
  email,
}: ResendVerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send verification email");
      }

      setStatus("success");
      setMessage("Email sent!");

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Error sending email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleResend}
        disabled={isLoading || status === "success"}
        className="whitespace-nowrap"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            Sending...
          </>
        ) : status === "success" ? (
          <>
            <Check className="mr-2 h-3 w-3" />
            Sent
          </>
        ) : (
          "Verify Email"
        )}
      </Button>

      {status === "error" && (
        <span className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={12} />
          {message}
        </span>
      )}
    </div>
  );
}
