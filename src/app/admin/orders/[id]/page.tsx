import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/admin-data";
import StatusBadge from "@/components/admin/StatusBadge";
import StatusActions from "@/components/admin/StatusActions";

const STATUS_LABELS: Record<string, string> = {
  pending: "Menunggu",
  preparing: "Diproses",
  ready: "Siap",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export default async function OrderDetailPage({
  params,
}: PageProps<"/admin/orders/[id]">) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isInteger(orderId)) {
    notFound();
  }

  const order = await getOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <section>
      <div className="mb-6">
        <Link
          href="/admin/orders"
          className="text-sm text-brand hover:underline"
        >
          ← Kembali ke daftar order
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">
              Order #{order.id}
            </h1>

            <p className="mt-1 text-sm text-ink/60">
              {order.date} · {order.time}
            </p>
          </div>

          <span className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold ">
            <StatusBadge status={order.status} />
            <StatusActions orderId={order.id} status={order.status} />
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
        <div className="border-b border-ink/10 px-5 py-4">
          <h2 className="font-bold">Item Order</h2>
        </div>

        <div className="divide-y divide-ink/10">
          {order.lines.map((line, index) => (
            <div
              key={`${line.pizzaId}-${line.size}-${index}`}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <Link
                  href={`/admin/products/${line.pizzaId}`}
                  className="font-semibold text-brand underline"
                >
                  {line.name}
                </Link>

                <p className="mt-1 text-sm text-ink/60">
                  {line.size} × {line.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ${(line.price * line.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink/10 px-5 py-5">
          <span className="font-bold">Total</span>

          <span className="text-xl font-black">
            ${order.total.toFixed(2)}
          </span>
        </div>
      </div>
    </section>
  );
}