import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, AlertTriangle } from "lucide-react";
import SignOutButton from "../../components/auth/sign-out-button";
import Logo from "@/components/shared/logo";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/shared/button";
import ResendVerificationButton from "@/components/auth/resend-verification-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userName={session.user?.name} />
      {!session.user.emailVerified && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-start  md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                Your email address is not verified. Please verify your email to
                ensure account security.
              </p>
            </div>
            <ResendVerificationButton email={session.user.email || ""} />
          </div>
        </div>
      )}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
