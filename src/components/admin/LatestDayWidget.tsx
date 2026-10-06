import { getLatestDay } from "@/lib/admin-data";

export default async function LatestDayWidget() {
  const data = await getLatestDay();

  return (
    <section className="h-full rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink/50">
            Hari terakhir
          </p>

          <h2 className="mt-1 text-lg font-bold">
            {data.date}
          </h2>
        </div>

        <div className="rounded-xl bg-brand/10 px-3 py-2 text-sm font-bold text-brand">
          Overview
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-ink/50">
            Total orders
          </p>

          <p className="mt-1 text-3xl font-black">
            {data.orders}
          </p>

          <p className="mt-1 text-xs text-ink/50">
            order hari ini
          </p>
        </div>

        <div>
          <p className="text-sm text-ink/50">
            Revenue
          </p>

          <p className="mt-1 text-3xl font-black">
            ${data.revenue.toFixed(2)}
          </p>

          <p className="mt-1 text-xs text-ink/50">
            total omzet
          </p>
        </div>
      </div>
    </section>
  );
}