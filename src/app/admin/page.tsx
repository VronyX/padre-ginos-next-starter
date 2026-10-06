import AdminOverview from "@/components/admin/AdminOverview";
import LatestDayWidget from "@/components/admin/LatestDayWidget";
import StatusWidget from "@/components/admin/StatusWidget";
import TopPizzasWidget from "@/components/admin/TopPizzasWidget";
import WidgetErrorBoundary from "@/components/admin/WidgetErrorBoundary";
import Link from "next/link";
import { Suspense } from "react";

export default function AdminHome() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Overview</h1>

          <p className="mt-2 text-ink/70">Ringkasan aktivitas toko.</p>
        </div>
        <div className="mt-6 flex gap-4">
          <Link
            href="/admin/products"
            className="rounded-xl bg-white px-5 py-4 font-semibold shadow-sm"
          >
            Kelola produk →
          </Link>
          <Link
            href="/admin/orders"
            className="rounded-xl bg-white px-5 py-4 font-semibold shadow-sm"
          >
            Lihat order →
          </Link>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {/* Latest Day */}
        <Suspense fallback={<AdminOverview />}>
          <LatestDayWidget />
        </Suspense>

        {/* Status */}
        <WidgetErrorBoundary title="Status order">
          <Suspense fallback={<AdminOverview />}>
            <StatusWidget />
          </Suspense>
        </WidgetErrorBoundary>

        {/* Top Pizzas */}
        <div className="lg:col-span-2">
          <Suspense fallback={<AdminOverview />}>
            <TopPizzasWidget />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
