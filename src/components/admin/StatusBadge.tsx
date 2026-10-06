import type { OrderStatus } from "@/lib/orders";
import { STATUS_LABELS } from "@/lib/orders";

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  preparing: "bg-blue-100 text-blue-700",
  ready: "bg-green-100 text-green-700",
  delivered: "bg-gray-400 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}