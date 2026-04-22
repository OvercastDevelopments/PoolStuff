import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — PoolStuff",
  description: "Authorized Dolphin Pool Robot service centre, Lovibond water testing service centre, and commercial aquatics pool fit-outs.",
};

const services = [
  {
    icon: "🤖",
    title: "Dolphin Pool Robot Service Centre",
    desc: "Authorized service centre for Maytronics Dolphin robotic pool cleaners. Factory-trained technicians diagnose and repair every model — from residential units to commercial-grade cleaners — using genuine Dolphin parts.",
    bullets: [
      "Warranty and out-of-warranty repairs",
      "Genuine Maytronics parts in stock",
      "Motor, drive, and tracking diagnostics",
      "Cable, brush, and filter servicing",
      "Fast turnaround — most jobs under a week",
    ],
  },
  {
    icon: "💧",
    title: "Lovibond Service Centre",
    desc: "Authorized Lovibond service centre for water testing instruments. We calibrate, service, and repair photometers, colorimeters, and electronic testers used in commercial pool and aquatic facilities.",
    bullets: [
      "Photometer calibration & certification",
      "Electrode and sensor replacement",
      "Firmware updates",
      "Replacement reagents and tablets",
      "Loaner units during extended repairs",
    ],
  },
  {
    icon: "🏗️",
    title: "Commercial Aquatics Pool Fit Outs",
    desc: "End-to-end fit-outs for commercial aquatic facilities — hotels, fitness centres, aquatic clubs, and municipal pools. From plant-room design to tile-out, we deliver compliant, efficient, and future-ready installations.",
    bullets: [
      "Plant-room design & installation",
      "Filtration, pumps, heating & dosing",
      "Automation & IoT monitoring",
      "Compliance with health and safety codes",
      "Project management & staged commissioning",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Our Services</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            An authorized Dolphin and Lovibond service centre, and a specialist in commercial aquatics pool fit-outs — everything your facility needs under one roof.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl border border-sky-100 p-7 hover:shadow-lg transition">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="text-slate-600 mt-2">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-sky-500">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Need a service contract?</h2>
          <p className="mt-3 text-slate-600">
            Send us the details of your facility and we&apos;ll put together a tailored commercial service proposal — typically within two business days.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Request a Proposal
          </Link>
        </div>
      </section>
    </>
  );
}
