"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

type Point = {
  date: string;
  revenue: number;
  orders: number;
};

const Chart = dynamic(
  () => import("recharts").then((mod) => {
    return function ChartComponent({
      trend,
    }: {
      trend: Point[];
    }) {
      const {
        CartesianGrid,
        Line,
        LineChart,
        ResponsiveContainer,
        Tooltip,
        XAxis,
        YAxis,
      } = mod;

      return (
        <div className="mt-4 h-64" data-testid="trend-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => String(value)}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#b91c1c"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    };
  }),
);

export default function TrendChart({
  trend,
}: {
  trend: Point[];
}) {
  const [showChart, setShowChart] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowChart((v) => !v)}
        className="mt-4 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white"
      >
        {showChart ? "Sembunyikan grafik" : "Tampilkan grafik"}
      </button>

      {showChart && <Chart trend={trend} />}
    </>
  );
}