"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search products"
      className="mt-6 flex items-center gap-2 bg-white/15 backdrop-blur border border-white/40 rounded-full p-1.5 pl-5 w-full max-w-6xl"
    >
      <svg
        className="w-5 h-5 text-white/80 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products…"
        className="flex-1 bg-transparent text-white placeholder-white/70 focus:outline-none py-2"
        aria-label="Search products"
      />
      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-full font-semibold transition"
      >
        Search
      </button>
    </form>
  );
}
