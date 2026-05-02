import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — PoolStuff",
  description: "PoolStuff manufactures and supplies world-class aquatic facility and performance equipment to the New Zealand commercial pool market.",
};

const values = [
  { title: "Reliability", desc: "Service contracts you can count on — your pool stays open, your inspections pass, and your patrons stay safe." },
  { title: "Compliance", desc: "CPO®-certified staff, documented logs, and deep knowledge of state and local health codes." },
  { title: "Responsiveness", desc: "Emergency service when equipment fails — because every hour of downtime costs you revenue and reputation." },
];

const team = [
  { name: "Scott Brearley", role: "Director" },
  { name: "Sharlene Brearley", role: "Director" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">About PoolStuff</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Manufacturers and suppliers of world-class aquatic facility and performance equipment, serving the New Zealand commercial pool market.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Welcome to PoolStuff — manufacturers and suppliers of world-class aquatic facility and performance equipment. We&apos;re committed to meeting every pool-related need with top-quality products, delivered to the New Zealand market at competitive prices.
          </p>

          <div>
            <h3 className="text-xl font-bold text-sky-700 mb-2">Customer Support</h3>
            <p>
              We put our clients first. Outstanding service is what lets you stop worrying about your pool equipment and focus on growing your business.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-sky-700 mb-2">Experience</h3>
            <p>
              With more than 17 years of pool operations expertise and 20 years importing and manufacturing commercial pool equipment, we know what makes a quality pool product — and what it takes to keep one running.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-sky-700 mb-2">The Finest Products</h3>
            <p>
              We&apos;ve searched the globe for durable, high-value equipment built to thrive in the demanding conditions of a commercial pool environment. Every product we stock has earned its place.
            </p>
          </div>

          <div className="pt-4 border-t border-sky-100">
            <p className="text-slate-600">Kind regards,</p>
            <p className="font-semibold text-slate-900 mt-1">Scott Brearley</p>
          </div>
        </div>
      </section>

      <section className="bg-sky-50/60 border-y border-sky-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-sky-100">
                <h3 className="text-xl font-bold text-sky-700">{v.title}</h3>
                <p className="text-slate-600 mt-3">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {team.map((m) => (
            <div key={m.name} className="text-center">
              <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-sky-300 to-cyan-400 mb-4" />
              <h3 className="font-bold text-slate-900">{m.name}</h3>
              <p className="text-sm text-slate-500">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Let&apos;s talk commercial pools.</h2>
        <p className="mt-3 text-slate-600">
          Whether you&apos;re planning a new facility, reviewing service contracts, or dealing with an urgent equipment issue, we&apos;re ready to help.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-6 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold transition"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
