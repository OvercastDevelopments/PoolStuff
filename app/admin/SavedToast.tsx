"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const messages: Record<string, string> = {
  "1": "Saved.",
  create: "Created.",
  update: "Saved.",
  delete: "Deleted.",
};

export default function SavedToast() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const saved = params.get("saved");
  const [visible, setVisible] = useState(Boolean(saved));
  const message = saved ? messages[saved] ?? "Saved." : "";

  useEffect(() => {
    if (!saved) return;
    setVisible(true);
    const t1 = setTimeout(() => setVisible(false), 2200);
    const t2 = setTimeout(() => {
      const next = new URLSearchParams(params);
      next.delete("saved");
      const q = next.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [saved, pathname, params, router]);

  if (!saved) return null;

  return (
    <div
      aria-live="polite"
      className={
        "fixed top-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-300 " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none")
      }
    >
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path
          fillRule="evenodd"
          d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42L8.5 12.086l6.79-6.79a1 1 0 011.42 0z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </div>
  );
}
