import ProfileForm from "@/components/ProfileForm";
import { requireUser } from "@/lib/auth";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Akun saya — Padre Gino's" };

export default function AccountPage() {
  return (
    <section className="mx-auto max-w-lg">
      <h1 className="text-3xl font-black">Akun saya</h1>
      <Suspense fallback={<p className="mt-4 text-ink/60">Memuat akun...</p>}>
        <AccountContent />
      </Suspense>
    </section>
  );
}

async function AccountContent() {
  const user = await requireUser();
  return (
    <>
      <ProfileForm
        profile={{
          name: user.name,
          phone: user.phone,
          address: user.address,
        }}
      />
    </>
  );
}
