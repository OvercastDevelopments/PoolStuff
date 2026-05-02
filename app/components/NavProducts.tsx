"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "../products/ProductsCatalog";

export default function NavProducts() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 hover:text-sky-400 transition"
      >
        Products
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-sky-100 py-2 z-50"
        >
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="block px-5 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 border-b border-sky-100"
          >
            All Products
          </Link>
          {PRODUCT_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/products?category=${encodeURIComponent(c)}`}
              onClick={() => setOpen(false)}
              role="menuitem"
              className="block px-5 py-2 text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
            >
              {c}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
