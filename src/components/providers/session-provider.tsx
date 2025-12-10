"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      // Refetch session every 5 minutes to keep it fresh
      refetchInterval={5 * 60}
      // Refetch session when window regains focus (tab switching)
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}
