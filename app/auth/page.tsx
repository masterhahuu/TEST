"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

export default function AuthPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (storage.getUser()) router.replace("/draw");
  }, [router]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    storage.setUser(name.trim());
    router.push("/draw");
  };

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card">
          <h1 style={{ marginTop: 0 }}>Welcome to SketchFlow</h1>
          <p style={{ color: "#c3c3d4" }}>Sign in to start drawing and save your art history.</p>
          <form onSubmit={submit} style={{ display: "grid", gap: ".75rem" }}>
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="name"
            />
            <button className="btn-primary" type="submit">Continue</button>
          </form>
        </div>
      </div>
    </main>
  );
}
