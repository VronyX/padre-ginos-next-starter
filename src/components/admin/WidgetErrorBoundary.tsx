"use client";

import { catchError } from "next/error";

function WidgetErrorFallback(
  props: { title: string },
  errorInfo: {
    error: unknown;
    retry: () => void;
  },
) {
  return (
    <section
      role="alert"
      className="rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold text-red-800">
        {props.title}
      </h2>

      <p className="mt-2 text-ink/70">
        Gagal memuat data ini.
      </p>

      <button
        type="button"
        onClick={() => errorInfo.retry()}
        className="mt-4 rounded-lg bg-brand px-4 py-2 font-semibold text-white"
      >
        Coba lagi
      </button>
    </section>
  );
}

const ErrorBoundary = catchError(WidgetErrorFallback);

export default function WidgetErrorBoundary({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary title={title}>
      {children}
    </ErrorBoundary>
  );
}