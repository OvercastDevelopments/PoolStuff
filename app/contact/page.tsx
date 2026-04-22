import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — PoolStuff",
  description: "Contact PoolStuff for commercial proposals, service contracts, equipment quotes, and emergency service.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-sky-600 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
          <p className="mt-4 text-sky-50 text-lg max-w-2xl">
            Proposals, service contracts, equipment quotes, or emergency service — we typically respond within one business day. For urgent equipment issues, call directly.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900">Visit us</h3>
            <p className="text-slate-600 mt-1">
              123 Poolside Ave<br />
              Sunnyvale, CA 94086
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Call or email</h3>
            <p className="text-slate-600 mt-1">
              <a href="tel:5551234567" className="hover:text-sky-600">(555) 123-4567</a><br />
              <a href="mailto:hello@poolstuff.example" className="hover:text-sky-600">hello@poolstuff.example</a>
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Hours</h3>
            <ul className="text-slate-600 mt-1 text-sm space-y-0.5">
              <li>Mon–Fri: 8am – 6pm</li>
              <li>Saturday: 9am – 4pm</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <form className="md:col-span-2 bg-white rounded-2xl border border-sky-100 p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">Phone (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1">Company / Facility</label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label htmlFor="facility-type" className="block text-sm font-semibold text-slate-700 mb-1">Facility type</label>
              <select
                id="facility-type"
                name="facility-type"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option>Hotel / Resort</option>
                <option>HOA / Condo / Apartment</option>
                <option>Fitness Center / Gym</option>
                <option>Aquatic Center / YMCA</option>
                <option>School / University</option>
                <option>Municipal / Parks &amp; Rec</option>
                <option>Other commercial</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-1">What can we help with?</label>
            <select
              id="topic"
              name="topic"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option>New commercial installation</option>
              <option>Service contract / maintenance</option>
              <option>Equipment service or repair</option>
              <option>Emergency service</option>
              <option>Product or equipment quote</option>
              <option>Compliance / inspection support</option>
              <option>Something else</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}
