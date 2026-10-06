import { getTopPizzas } from "@/lib/admin-data";

export default async function TopPizzasWidget() {
  const pizzas = await getTopPizzas();

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-ink/50">
            All-time performance
          </p>

          <h2 className="mt-1 text-lg font-bold">
            Pizza terlaris sepanjang masa
          </h2>
        </div>

        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-ink/60">
          Top 5
        </span>
      </div>

      <div className="mt-6">
        {pizzas.map((pizza, index) => (
          <div
            key={pizza.id}
            className="flex items-center gap-4 border-b border-stone-100 py-4 last:border-0"
          >
            {/* Ranking */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-black">
              {index + 1}
            </div>

            {/* Pizza info */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">
                {pizza.name}
              </p>

              <p className="mt-1 text-xs text-ink/50">
                {pizza.sold.toLocaleString()} sold
              </p>
            </div>

            {/* Revenue */}
            <div className="text-right">
              <p className="font-bold">
                ${pizza.revenue.toFixed(2)}
              </p>

              <p className="mt-1 text-xs text-ink/50">
                revenue
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}