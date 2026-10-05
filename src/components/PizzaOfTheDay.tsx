import Image from "next/image";
import DismissibleBanner from "@/components/DismissibleBanner";
import { getPizzaOfTheDay } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export default async function PizzaOfTheDay() {
  const pizza = await getPizzaOfTheDay();

  if (!pizza) return null;

  return (
    <DismissibleBanner>
      <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="grid sm:grid-cols-[220px_1fr]">
          <Image
            src={pizza.image}
            alt={pizza.name}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />

          <div className="flex flex-col justify-center gap-3 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Pizza of the Day
            </p>

            <h2 className="text-2xl font-black">{pizza.name}</h2>

            <p className="text-sm text-ink/70">
              Nikmati pizza pilihan hari ini!
            </p>

            <p className="font-semibold">Mulai {formatPrice(pizza.sizes.M)}</p>
          </div>
        </div>
      </div>
    </DismissibleBanner>
  );
}
