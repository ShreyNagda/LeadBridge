import Link from "next/link";
import { getServerSession } from "next-auth";
import Logo from "@/components/shared/logo";
import { authOptions } from "@/lib/auth";
import { Button } from "../shared/button";
import MobileMenu from "./mobile-menu";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm  px-6 lg:px-12 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-4">
        <nav className="hidden sm:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-sm hover:opacity-80 transition-opacity"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm hover:opacity-80 transition-opacity"
          >
            Pricing
          </Link>
          <Link
            href="/#docs"
            className="text-sm hover:opacity-80 transition-opacity"
          >
            Docs
          </Link>
          {session ? (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white px-4 py-2 rounded-md"
            >
              <Button variant="primary">Go to Dashboard</Button>{" "}
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm hover:opacity-80 transition-opacity"
              >
                <Button variant="secondary">Log in</Button>
              </Link>
              <Link href="/auth/register" className="text-sm font-medium">
                <Button variant="primary">Start for Free</Button>
              </Link>
            </>
          )}
        </nav>
        <MobileMenu session={session} />
      </div>
    </header>
  );
}
