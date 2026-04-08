"use client";

import { useEffect, useRef, useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { Nav } from "@/components/Nav";
import { SavedDraw, storage } from "@/lib/storage";

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [title, setTitle] = useState("Untitled");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.floor(rect.width);
      canvas.height = 480;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#0f0f16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#ffffff";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const drawAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(x - rect.left, y - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - rect.left, y - rect.top);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newDraw: SavedDraw = {
      id: crypto.randomUUID(),
      name: title.trim() || "Untitled",
      createdAt: new Date().toISOString(),
      dataUrl: canvas.toDataURL("image/png")
    };
    const draws = storage.getDraws();
    storage.saveDraws([newDraw, ...draws]);
    alert("Saved to history");
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0f0f16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <main className="page">
      <div className="container">
        <AuthGuard>
          <Nav />
          <div className="grid grid-2">
            <section className="card" style={{ display: "grid", gap: ".75rem", alignContent: "start" }}>
              <h3 style={{ margin: 0 }}>Controls</h3>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Drawing title" />
              <button className="btn-primary" onClick={saveDrawing}>Save drawing</button>
              <button onClick={clearCanvas}>Clear canvas</button>
              <p style={{ color: "#b8b8c7", marginBottom: 0 }}>Draw with mouse or touch. Fully responsive for mobile and desktop.</p>
            </section>
            <section className="card" ref={wrapRef}>
              <canvas
                ref={canvasRef}
                style={{ width: "100%", borderRadius: ".75rem", touchAction: "none" }}
                onMouseDown={(e) => {
                  setDrawing(true);
                  drawAt(e.clientX, e.clientY);
                }}
                onMouseMove={(e) => drawing && drawAt(e.clientX, e.clientY)}
                onMouseUp={() => setDrawing(false)}
                onMouseLeave={() => setDrawing(false)}
                onTouchStart={(e) => {
                  setDrawing(true);
                  const t = e.touches[0];
                  drawAt(t.clientX, t.clientY);
                }}
                onTouchMove={(e) => {
                  if (!drawing) return;
                  const t = e.touches[0];
                  drawAt(t.clientX, t.clientY);
                }}
                onTouchEnd={() => setDrawing(false)}
              />
            </section>
          </div>
        </AuthGuard>
      </div>
    </main>
  );
}
