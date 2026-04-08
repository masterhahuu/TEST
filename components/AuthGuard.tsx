"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = storage.getUser();
    if (!user) {
      router.replace("/auth");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return <div className="card">Loading…</div>;

  return <>{children}</>;
}
