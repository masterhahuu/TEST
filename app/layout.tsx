import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SketchFlow",
  description: "Clean modern drawing app with auth and history"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
