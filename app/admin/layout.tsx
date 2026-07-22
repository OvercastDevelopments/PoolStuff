import Link from "next/link";
import { Suspense } from "react";
import { auth, signOut } from "../../auth";
import SavedToast from "./SavedToast";

export const metadata = { title: "PoolStuff Admin" };

async function doSignOut() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Not signed in → let middleware handle the redirect for protected pages;
  // just render children so the login page still works.
  if (!session?.user) {
    return (
      <>
        <Suspense fallback={null}>
          <SavedToast />
        </Suspense>
        {children}
      </>
    );
  }

  // Force password change flow if flagged
  const mustChange = (session.user as { mustChangePassword?: boolean }).mustChangePassword;
  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/password", label: "Change Password" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="hidden md:flex md:flex-col w-64 bg-slate-900 text-slate-200 shrink-0">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="font-bold text-white text-lg">PoolStuff Admin</div>
          <div className="text-xs text-slate-400 mt-0.5">{session.user.name}</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block px-3 py-2 rounded-lg text-sm hover:bg-slate-800 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <form action={doSignOut} className="p-3 border-t border-slate-800">
          <button
            type="submit"
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Sign out
          </button>
        </form>
        <Link
          href="/"
          className="px-5 py-3 text-xs text-slate-400 hover:text-white border-t border-slate-800"
        >
          ← Back to site
        </Link>
      </aside>

      <main className="flex-1 p-6 md:p-10 relative">
        <Suspense fallback={null}>
          <SavedToast />
        </Suspense>
        {mustChange && (
          <PasswordChangeBanner />
        )}
        {children}
      </main>
    </div>
  );
}

function PasswordChangeBanner() {
  return (
    <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 text-sm flex items-center justify-between gap-4">
      <span>You&apos;re still using the initial password. Please change it now.</span>
      <Link
        href="/admin/password"
        className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-1.5 rounded-full"
      >
        Change password
      </Link>
    </div>
  );
}
