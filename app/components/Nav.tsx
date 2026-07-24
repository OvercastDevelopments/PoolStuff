import Link from "next/link";
import Image from "next/image";
import NavProducts from "./NavProducts";
import { asset } from "../lib/asset";
import { prisma } from "../lib/prisma";

const desktopLinks = [
  { href: "/", label: "Home" },
  { href: "/new-products", label: "New Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/new-products", label: "New Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

async function fetchCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: { name: true, slug: true },
    });
  } catch {
    // DB unreachable (e.g. Neon cold start during build) — render the nav
    // without categories rather than failing the whole page.
    return [];
  }
}

export default async function Nav() {
  const categories = await fetchCategories();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-end translate-y-12" aria-label="PoolStuff home">
          <Image
            src={asset("/poolstuff_logo.png")}
            alt="PoolStuff"
            width={400}
            height={125}
            priority
            className="h-28 md:h-40 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-slate-200">
          <Link href="/" className="hover:text-sky-400 transition">Home</Link>
          <NavProducts categories={categories} />
          {desktopLinks.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-sky-400 transition">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden md:inline-block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
        >
          Get a Quote
        </Link>
      </div>
      <nav className="md:hidden flex justify-center gap-5 text-xs font-medium text-slate-200 pb-3 px-4 overflow-x-auto">
        {mobileLinks.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-sky-400 whitespace-nowrap">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
