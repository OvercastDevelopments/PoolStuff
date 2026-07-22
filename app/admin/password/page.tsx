import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { auth } from "../../../auth";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function ChangePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  async function change(formData: FormData) {
    "use server";
    const current = String(formData.get("current") ?? "");
    const next = String(formData.get("next") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (next.length < 8) {
      redirect("/admin/password?error=short");
    }
    if (next !== confirm) {
      redirect("/admin/password?error=mismatch");
    }

    const s = await auth();
    if (!s?.user) redirect("/admin/login");
    const userId = (s.user as { id?: string }).id;
    if (!userId) redirect("/admin/login");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) redirect("/admin/login");

    const ok = await bcrypt.compare(current, user.passwordHash);
    if (!ok) redirect("/admin/password?error=wrongcurrent");

    const passwordHash = await bcrypt.hash(next, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash, mustChangePassword: false },
    });

    redirect("/admin/password?ok=1");
  }

  const errors: Record<string, string> = {
    short: "Password must be at least 8 characters.",
    mismatch: "The two new passwords don't match.",
    wrongcurrent: "Current password is incorrect.",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Change password</h1>

      <form action={change} className="max-w-md bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        {params.error && errors[params.error] && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
            {errors[params.error]}
          </div>
        )}
        {params.ok && (
          <div className="rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2">
            Password updated.
          </div>
        )}

        <div>
          <label htmlFor="current" className="block text-sm font-semibold text-slate-700 mb-1">
            Current password
          </label>
          <input
            id="current"
            name="current"
            type="password"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label htmlFor="next" className="block text-sm font-semibold text-slate-700 mb-1">
            New password
          </label>
          <input
            id="next"
            name="next"
            type="password"
            required
            minLength={8}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-slate-500 mt-1">At least 8 characters.</p>
        </div>

        <div>
          <label htmlFor="confirm" className="block text-sm font-semibold text-slate-700 mb-1">
            Confirm new password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2.5 rounded-full transition"
        >
          Update password
        </button>
      </form>
    </div>
  );
}
