"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

const tabs = [
  { href: "/draw", label: "Main app" },
  { href: "/history", label: "History" }
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="nav">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="card"
          style={{
            padding: ".55rem .85rem",
            borderColor: pathname === tab.href ? "#8a7aff" : "#2c2c40"
          }}
        >
          {tab.label}
        </Link>
      ))}
      <button
        onClick={() => {
          storage.clearUser();
          router.push("/auth");
        }}
        className="btn-danger"
      >
        Log out
      </button>
    </nav>
  );
}
