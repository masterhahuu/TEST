"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { Nav } from "@/components/Nav";
import { SavedDraw, storage } from "@/lib/storage";

export default function HistoryPage() {
  const [draws, setDraws] = useState<SavedDraw[]>([]);

  useEffect(() => {
    setDraws(storage.getDraws());
  }, []);

  const remove = (id: string) => {
    const next = draws.filter((d) => d.id !== id);
    setDraws(next);
    storage.saveDraws(next);
  };

  return (
    <main className="page">
      <div className="container">
        <AuthGuard>
          <Nav />
          <section className="card">
            <h2 style={{ marginTop: 0 }}>Saved drawings history</h2>
            {draws.length === 0 && <p style={{ color: "#b8b8c7" }}>No drawings yet. Go to Main app and save one.</p>}
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
              {draws.map((draw) => (
                <article key={draw.id} className="card" style={{ padding: ".75rem" }}>
                  <img src={draw.dataUrl} alt={draw.name} style={{ width: "100%", borderRadius: ".5rem" }} />
                  <h4 style={{ marginBottom: ".25rem" }}>{draw.name}</h4>
                  <small style={{ color: "#b8b8c7", display: "block", marginBottom: ".75rem" }}>
                    {new Date(draw.createdAt).toLocaleString()}
                  </small>
                  <button className="btn-danger" onClick={() => remove(draw.id)}>Delete</button>
                </article>
              ))}
            </div>
          </section>
        </AuthGuard>
      </div>
    </main>
  );
}
