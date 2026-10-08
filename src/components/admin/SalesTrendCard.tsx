import { formatPrice } from "@/lib/format";
import TrendChart from "./TrendChart";

type Point = {
  date: string;
  revenue: number;
  orders: number;
};

export default function SalesTrendCard({
  trend,
}: {
  trend: Point[];
}) {
  const total = trend.reduce((sum, p) => sum + p.revenue, 0);

  const best = trend.reduce(
    (a, b) => (b.revenue > a.revenue ? b : a),
    trend[0],
  );

  return (
    <div
      data-testid="widget-trend"
      className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-3"
    >
      <h2 className="text-sm font-semibold uppercase text-ink/60">
        Tren 30 hari terakhir
      </h2>

      <div className="mt-3 flex flex-wrap gap-8">
        <p>
          <span className="block text-3xl font-black">
            {formatPrice(total)}
          </span>
          <span className="text-ink/70">total pendapatan</span>
        </p>

        <p>
          <span className="block text-3xl font-black">
            {formatPrice(total / trend.length)}
          </span>
          <span className="text-ink/70">rata-rata per hari</span>
        </p>

        {best && (
          <p>
            <span className="block text-3xl font-black">
              {best.date}
            </span>
            <span className="text-ink/70">
              hari terbaik ({formatPrice(best.revenue)})
            </span>
          </p>
        )}
      </div>

      <TrendChart trend={trend} />
    </div>
  );
}