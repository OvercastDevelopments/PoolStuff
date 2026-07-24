import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

// Nav pulls categories from Prisma so the layout can't be statically prerendered
// (Neon Postgres autosuspends between deploys and would fail the build).
export const dynamic = "force-dynamic";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
