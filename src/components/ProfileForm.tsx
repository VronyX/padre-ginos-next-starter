"use client";

import { useActionState } from "react";

import {
  updateProfileAction,
  type ProfileFormState,
} from "@/app/(shop)/account/actions";
import type { Profile } from "@/lib/types";

const initialState: ProfileFormState = null;

export default function ProfileForm({
  profile,
}: {
  profile: Profile;
}) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  const values = state?.values ?? {
    name: profile.name,
    phone: profile.phone ?? "",
    address: profile.address ?? "",
  };

  return (
    <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Informasi profil</h2>
        <p className="mt-1 text-sm text-ink/60">
          Perbarui informasi pribadi dan alamat pengiriman kamu.
        </p>
      </div>

      {state?.ok && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
        >
          Profil disimpan.
        </div>
      )}

      {state?.errors.form && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.errors.form}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-5" noValidate>
        <Field
          label="Nama"
          name="name"
          defaultValue={values.name}
          error={state?.errors.name}
          placeholder="Masukkan nama kamu"
        />

        <Field
          label="Telepon"
          name="phone"
          defaultValue={values.phone}
          error={state?.errors.phone}
          inputMode="tel"
          placeholder="Contoh: 08123456789"
        />

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">
            Alamat pengiriman
          </span>

          <textarea
            name="address"
            rows={4}
            defaultValue={values.address}
            placeholder="Masukkan alamat pengiriman"
            aria-invalid={Boolean(state?.errors.address)}
            className="resize-y rounded-xl border border-black/10 bg-stone-50 px-4 py-3 text-sm outline-none transition placeholder:text-ink/40 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 aria-invalid:border-red-500 aria-invalid:focus:ring-red-200"
          />

          {state?.errors.address && (
            <span className="text-sm text-red-600">
              {state.errors.address}
            </span>
          )}
        </label>

        <div className="flex items-center justify-end border-t border-black/10 pt-5">
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Menyimpan..." : "Simpan profil"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  error,
  inputMode,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue: string;
  error?: string;
  inputMode?: "tel";
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold">{label}</span>

      <input
        name={name}
        defaultValue={defaultValue}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="rounded-xl border border-black/10 bg-stone-50 px-4 py-3 text-sm outline-none transition placeholder:text-ink/40 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 aria-invalid:border-red-500 aria-invalid:focus:ring-red-200"
      />

      {error && (
        <span className="text-sm text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}