import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import Logo from "@/components/shared/logo";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <RegisterForm />
    </div>
  );
}
