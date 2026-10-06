"use client";

import { useState } from "react";

type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

type Props = {
  counts: Record<OrderStatus, number>;
};

const statusConfig: {
  key: OrderStatus;
  label: string;
  color: string;
}[] = [
  {
    key: "pending",
    label: "Pending",
    color: "#f59e0b",
  },
  {
    key: "preparing",
    label: "Preparing",
    color: "#3b82f6",
  },
  {
    key: "ready",
    label: "Ready",
    color: "#8b5cf6",
  },
  {
    key: "delivered",
    label: "Delivered",
    color: "#10b981",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    color: "#ef4444",
  },
];

export default function StatusDonut({ counts }: Props) {
  const [activeStatus, setActiveStatus] =
    useState<OrderStatus | null>(null);

  const total = statusConfig.reduce(
    (sum, status) => sum + counts[status.key],
    0,
  );

  const active = activeStatus
    ? statusConfig.find(
        (status) => status.key === activeStatus,
      )
    : null;

  const activeValue = active
    ? counts[active.key]
    : total;

  const activePercentage =
    active && total > 0
      ? Math.round((activeValue / total) * 100)
      : 100;

  return (
    <div className="flex flex-col items-center gap-5 xl:flex-row xl:justify-between">
      {/* Donut */}
      <div className="relative h-52 w-52 shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="14"
          />

          {total > 0 &&
            statusConfig.map((status, index) => {
              const value = counts[status.key];

              if (value === 0) return null;

              const previousValues = statusConfig
                .slice(0, index)
                .reduce(
                  (sum, item) =>
                    sum + counts[item.key],
                  0,
                );

              const circumference =
                2 * Math.PI * 38;

              const dashLength =
                (value / total) * circumference;

              const dashOffset =
                -(previousValues / total) *
                circumference;

              const isActive =
                activeStatus === status.key;

              return (
                <circle
                  key={status.key}
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke={status.color}
                  strokeWidth={isActive ? 17 : 14}
                  strokeDasharray={`${dashLength} ${circumference}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    opacity:
                      activeStatus && !isActive
                        ? 0.3
                        : 1,
                  }}
                  onMouseEnter={() =>
                    setActiveStatus(status.key)
                  }
                  onMouseLeave={() =>
                    setActiveStatus(null)
                  }
                />
              );
            })}
        </svg>

        {/* Center information */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black">
            {activeValue}
          </span>

          <span className="mt-1 text-xs font-medium text-ink/50">
            {active
              ? `${activePercentage}%`
              : "Total orders"}
          </span>

          {active && (
            <span className="mt-1 text-sm font-bold">
              {active.label}
            </span>
          )}
        </div>
      </div>

      {/* Status list */}
      <div className="w-full max-w-xs space-y-2">
        {statusConfig.map((status) => {
          const value = counts[status.key];

          const percentage =
            total > 0
              ? Math.round((value / total) * 100)
              : 0;

          const isActive =
            activeStatus === status.key;

          return (
            <div
              key={status.key}
              className={`flex cursor-default items-center justify-between rounded-xl px-3 py-2 transition ${
                isActive ? "bg-stone-100" : ""
              }`}
              onMouseEnter={() =>
                setActiveStatus(status.key)
              }
              onMouseLeave={() =>
                setActiveStatus(null)
              }
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: status.color,
                  }}
                />

                <span className="text-sm font-medium">
                  {status.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">
                  {value}
                </span>

                <span className="text-xs text-ink/40">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}