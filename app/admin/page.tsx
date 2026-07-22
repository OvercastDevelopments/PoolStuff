import Link from "next/link";
import { prisma } from "../lib/prisma";

export default async function AdminDashboard() {
  const [productCount, newCount, catCount, subCount] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isNew: true } }),
    prisma.category.count(),
    prisma.subcategory.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "New Products", value: newCount, href: "/admin/products?filter=new" },
    { label: "Categories", value: catCount, href: "/admin/categories" },
    { label: "Sub-categories", value: subCount, href: "/admin/categories" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage the PoolStuff catalog.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2.5 rounded-full transition"
        >
          + Add product
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition"
          >
            <div className="text-3xl font-bold text-slate-900">{s.value}</div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Quick actions</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/admin/products/new" className="text-sky-600 hover:text-sky-700 font-semibold">Add a product →</Link></li>
            <li><Link href="/admin/products" className="text-sky-600 hover:text-sky-700 font-semibold">Edit an existing product →</Link></li>
            <li><Link href="/admin/categories" className="text-sky-600 hover:text-sky-700 font-semibold">Manage categories & sub-categories →</Link></li>
            <li><Link href="/admin/password" className="text-sky-600 hover:text-sky-700 font-semibold">Change your password →</Link></li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Live site</h2>
          <p className="text-sm text-slate-600">
            Changes made here appear on the customer-facing site within a minute.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sky-600 hover:text-sky-700 font-semibold text-sm"
          >
            Open live site →
          </Link>
        </div>
      </div>
    </div>
  );
}
