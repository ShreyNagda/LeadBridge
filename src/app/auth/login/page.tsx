import LoginForm from "@/components/auth/login-form";
import Link from "next/link";
import Logo from "@/components/shared/logo";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
