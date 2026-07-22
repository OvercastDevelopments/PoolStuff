import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";

export const metadata = { title: "Admin Login — PoolStuff" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next ?? "/admin";
  const errorMessage = params.error ? "Invalid username or password." : null;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        username: formData.get("username"),
        password: formData.get("password"),
        redirectTo: nextPath,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect(`/admin/login?error=1${nextPath ? `&next=${encodeURIComponent(nextPath)}` : ""}`);
      }
      throw err;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <form
        action={login}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-5"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">PoolStuff Admin</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to manage products.</p>
        </div>

        {errorMessage && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2">
            {errorMessage}
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-full transition"
        >
          Sign in
        </button>

        <div className="text-center pt-2 border-t border-slate-100">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-sky-600 font-medium"
          >
            ← Back to main site
          </Link>
        </div>
      </form>
    </div>
  );
}
