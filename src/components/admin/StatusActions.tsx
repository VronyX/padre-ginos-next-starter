"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { nextStatuses, STATUS_LABELS, type OrderStatus } from "@/lib/orders";
import {
  updateOrderStatusAction,
  type OrderFormState,
} from "@/app/admin/actions";

function SubmitButtons({ statuses }: { statuses: OrderStatus[] }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          type="submit"
          name="status"
          value={status}
          disabled={pending}
          className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Menyimpan…" : `Ubah ke ${STATUS_LABELS[status]}`}
        </button>
      ))}
    </div>
  );
}

export default function StatusActions({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}) {
  const [state, formAction] = useActionState<OrderFormState, FormData>(
    updateOrderStatusAction,
    null,
  );

  const statuses = nextStatuses(status);

  return (
    <section className="mt-6">
      <form action={formAction} className="mt-3">
        <input type="hidden" name="id" value={orderId} />

        {statuses.length > 0 ? (
          <SubmitButtons statuses={statuses} />
        ) : (
          <p className="text-sm text-ink/60">
            Status final, tidak bisa diubah lagi.
          </p>
        )}
      </form>

      {state?.error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}
    </section>
  );
}
