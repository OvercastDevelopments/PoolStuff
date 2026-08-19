import Link from "next/link";
import Image from "next/image";
import { asset } from "../lib/asset";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 font-bold text-xl text-white mb-3">
            <div className="bg-white rounded-md p-1.5">
              <Image
                src={asset("/poolstuff_logo.png")}
                alt="PoolStuff"
                width={120}
                height={38}
                className="h-9 w-auto"
              />
            </div>
            PoolStuff
          </div>
          <p className="text-sm text-slate-400">
            PoolStuff provides commercial-grade equipment, ensures code-compliant maintenance, and offers prompt equipment service — all aimed at keeping pools operational and ensuring the safety of patrons.
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
          <address className="not-italic text-sm text-slate-400 space-y-2">
            <div>
              <div className="text-slate-200 font-medium">PoolStuff Limited</div>
              <div>Unit 17, 40 Andromeda Crescent</div>
              <div>East Tamaki, Manukau 2013</div>
            </div>
            <div>
              <div>PO Box 64-354</div>
              <div>Botany, Manukau 2163</div>
            </div>
            <div className="space-y-0.5">
              <div>Ph: <a href="tel:+6492747406" className="hover:text-sky-400">09 274-7406</a></div>
              <div>Mob: <a href="tel:+64275012513" className="hover:text-sky-400">027 501-2513</a></div>
            </div>
          </address>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Hours</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Mon–Fri: 8.30am – 5pm</li>
            <li>Sat &amp; Sun: Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PoolStuff. All rights reserved.
      </div>
    </footer>
  );
}
