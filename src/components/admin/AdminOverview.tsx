import LatestDayWidget from "./LatestDayWidget";
import TopPizzasWidget from "./TopPizzasWidget";
import StatusWidget from "./StatusWidget";

export default function AdminOverview() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="h-6 w-40 animate-pulse rounded bg-stone-200" />
      <div className="mt-4 h-20 animate-pulse rounded bg-stone-100" />
    </section>
  );
}