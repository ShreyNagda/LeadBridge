"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Hook to synchronize session state across browser tabs
 * Listens for localStorage changes and refetches session when needed
 */
export function useSessionSync() {
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Listen for storage events (cross-tab communication)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "session-event") {
        // Session changed in another tab, refetch
        update();
        router.refresh();
      }
    };

    // Listen for visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Tab became visible, check session
        update();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [update, router]);

  return session;
}
