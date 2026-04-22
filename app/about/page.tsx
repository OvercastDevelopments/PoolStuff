import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — PoolStuff",
  description: "PoolStuff is a commercial pool service and supply company serving hotels, HOAs, aquatic facilities, and municipalities since 2005.",
};

const values = [
  { title: "Reliability", desc: "Service contracts you can count on — your pool stays open, your inspections pass, and your patrons stay safe." },
  { title: "Compliance", desc: "CPO®-certified staff, documented logs, and deep knowledge of state and local health codes." },
  { title: "Responsiveness", desc: "Emergency service when equipment fails — because every hour of downtime costs you revenue and reputation." },
];

const team = [
  { name: "Jamie Rivera", role: "Founder & Lead Technician" },
  { name: "Sam Chen", role: "Service Manager" },
  { name: "Priya Patel", role: "Installation Foreman" },
  { name: "Marcus Holloway", role: "Water Chemistry Specialist" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">About PoolStuff</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            A commercial pool service and supply company. Since 2005, facility managers have trusted us to keep their pools open, compliant, and operating at peak efficiency.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Story</h2>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            PoolStuff started in 2005 with one service truck and a handful of hotel accounts. Today we serve hundreds of commercial properties — hotels, HOAs, fitness centers, aquatic centers, schools, and municipal facilities — across the region.
          </p>
          <p>
            Our focus has always been commercial. That means CPO®-certified technicians, documented chemistry logs, code-compliance expertise, and equipment partnerships that get your facility back online fast when something breaks. We understand that a closed pool costs you money and credibility — so we treat every call with urgency.
          </p>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
