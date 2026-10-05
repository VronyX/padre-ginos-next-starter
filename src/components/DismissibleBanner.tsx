"use client";

import { useState } from "react";

export default function DismissibleBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative">
      {children}

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-4 top-4 rounded-full bg-black/10 px-3 py-1 text-sm font-medium hover:bg-black/20"
      >
        Close
      </button>
    </div>
  );
}
