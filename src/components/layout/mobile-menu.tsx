"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Session } from "next-auth";

interface MobileMenuProps {
  session: Session | null;
}

export default function MobileMenu({ session }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4 z-50">
          <Link
            href="/#features"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/#docs"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2"
            onClick={() => setIsOpen(false)}
          >
            Docs
          </Link>
          <div className="h-px bg-gray-100 my-2"></div>
          {session ? (
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full">
                  Start for Free
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
