import Link from "next/link";
import Form from "next/form";
import { getOrders } from "@/lib/admin-data";
import StatusBadge from "@/components/admin/StatusBadge";
import { parseDate, parsePage } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  pending: "Menunggu",
  preparing: "Diproses",
  ready: "Siap",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export default async function OrdersPage({
  searchParams,
}: PageProps<"/admin/orders">) {
  const params = await searchParams;

  const page = parsePage(params.page);
  const date = parseDate(params.date);

  const { orders, totalPages } = await getOrders({
    page,
    date,
  });

  const previousPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  function paginationUrl(pageNumber: number) {
    const search = new URLSearchParams({
      page: String(pageNumber),
    });

    if (date) {
      search.set("date", date);
    }

    return `/admin/orders?${search.toString()}`;
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Order</h1>
          <p className="mt-1 text-sm text-ink/60">Daftar order pelanggan</p>
        </div>

        <Form action="/admin/orders" className="flex items-center gap-2">
          <label htmlFor="date" className="text-sm font-medium">
            Tanggal
          </label>

          <input
            id="date"
            name="date"
            type="date"
            defaultValue={date ?? ""}
            className="rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm"
          />

          <button
            type="submit"
            className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white"
          >
            Filter
          </button>
        </Form>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 bg-stone-50">
            <tr>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold">Waktu</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Item</th>
              <th className="px-5 py-3 text-right font-semibold">Total</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-ink/10">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50">
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-bold text-brand underline"
                  >
                    #{order.id}
                  </Link>
                </td>

                <td className="px-5 py-4">
                  <div>{order.date}</div>
                  <div className="text-xs text-ink/50">{order.time}</div>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="px-5 py-4">{order.items}</td>

                <td className="px-5 py-4 text-right font-semibold">
                  ${order.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="px-5 py-10 text-center text-ink/60">Tidak ada order.</p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-ink/60">
          Halaman {page} dari {totalPages}
        </p>

        <div className="flex gap-2">
          {previousPage ? (
            <Link
              href={paginationUrl(previousPage)}
              className="rounded-lg border border-ink/20 bg-white px-4 py-2 text-sm font-medium hover:bg-stone-50"
            >
              ← Sebelumnya
            </Link>
          ) : (
            <span className="rounded-lg border border-ink/10 px-4 py-2 text-sm text-ink/30">
              ← Sebelumnya
            </span>
          )}

          {nextPage ? (
            <Link
              href={paginationUrl(nextPage)}
              className="rounded-lg border border-ink/20 bg-white px-4 py-2 text-sm font-medium hover:bg-stone-50"
            >
              Berikutnya →
            </Link>
          ) : (
            <span className="rounded-lg border border-ink/10 px-4 py-2 text-sm text-ink/30">
              Berikutnya →
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
