"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export const PRODUCT_CATEGORIES = [
  "Accessibility Equipment",
  "Aquarobics",
  "Aquatic Facility Equipment",
  "Empex Water Park Equipment",
  "Pool Blankets and Winders",
  "Pool Cleaning & Maintenance",
  "Pool Vacuums",
  "Swim School Equipment",
  "Wash Down Hoses",
  "Waterpolo Equipment",
  "Water Safety Programme Equipment",
  "Water Toys",
  "Water Treatment Equipment",
  "Life Guarding & Safety Equipment",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type Product = {
  name: string;
  category: ProductCategory;
  price: string;
  blurb: string;
};

type Props = {
  products: Product[];
};

const CATEGORIES = ["All", ...PRODUCT_CATEGORIES] as const;
type Category = (typeof CATEGORIES)[number];

export default function ProductsCatalog({ products }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && (CATEGORIES as readonly string[]).includes(cat)) {
      setCategory(cat as Category);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [products, query, category]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white border border-sky-100 rounded-2xl p-5 md:p-6 shadow-sm mb-10 sticky top-20 z-30 md:static">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
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
              className="w-full rounded-full border border-slate-200 bg-slate-50 focus:bg-white pl-11 pr-11 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Search products"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm font-medium"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>
          <div className="relative md:w-72">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full appearance-none rounded-full border border-slate-200 bg-slate-50 focus:bg-white pl-5 pr-10 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              aria-label="Filter by category"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-500">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {query && <> matching “{query}”</>}
            {category !== "All" && <> in {category}</>}
          </div>
          {(query || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-600 text-lg">No products match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.name}
              className="bg-white rounded-2xl overflow-hidden border border-sky-100 hover:shadow-lg transition"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 to-cyan-300" />
              <div className="p-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-700">
                  {p.category}
                </span>
                <div className="flex items-start justify-between gap-3 mt-1">
                  <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                  <span className="text-sky-700 font-bold whitespace-nowrap">{p.price}</span>
                </div>
                <p className="text-slate-600 text-sm mt-2">{p.blurb}</p>
                <button className="mt-5 w-full bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold py-2 rounded-full transition">
                  Inquire
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
