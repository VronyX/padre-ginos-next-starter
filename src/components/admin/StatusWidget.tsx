import { getStatusCounts } from "@/lib/admin-data";
import StatusDonut from "./StatusDonut";

export default async function StatusWidget() {
  const counts = await getStatusCounts();

  return (
    <section className="h-full rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium text-ink/50">
          Order hari terakhir
        </p>

        <h2 className="mt-1 text-lg font-bold">
          Status order
        </h2>
      </div>

      <div className="mt-4">
        <StatusDonut counts={counts} />
      </div>
    </section>
  );
}