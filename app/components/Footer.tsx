import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
            <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500" />
            PoolStuff
          </div>
          <p className="text-sm text-slate-400">
            Commercial pool products, installation, service, and compliance — trusted by hotels, HOAs, and aquatic facilities.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-sky-400">Products</Link></li>
            <li><Link href="/new-products" className="hover:text-sky-400">New Products</Link></li>
            <li><Link href="/services" className="hover:text-sky-400">Services</Link></li>
            <li><Link href="/about" className="hover:text-sky-400">About</Link></li>
            <li><Link href="/contact" className="hover:text-sky-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>123 Poolside Ave</li>
            <li>Sunnyvale, CA 94086</li>
            <li>(555) 123-4567</li>
            <li>hello@poolstuff.example</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Hours</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Mon–Fri: 8am – 6pm</li>
            <li>Saturday: 9am – 4pm</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PoolStuff. All rights reserved.
      </div>
    </footer>
  );
}
