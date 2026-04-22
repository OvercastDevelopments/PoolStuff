import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/new-products", label: "New Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-sky-700">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500" />
          PoolStuff
        </Link>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-sky-600 transition">
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
      <nav className="md:hidden flex justify-center gap-5 text-xs font-medium text-slate-700 pb-3 px-4 overflow-x-auto">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-sky-600 whitespace-nowrap">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
