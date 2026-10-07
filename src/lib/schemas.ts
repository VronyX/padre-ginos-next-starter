import { z } from "zod";
import { ORDER_STATUSES } from "./orders";

// Validation = is this input well-formed? A schema says it once, on the
// server, instead of a pile of typeof / Number.isInteger checks.

export const orderStatusInput = z.object({
  orderId: z.coerce.number().int().positive(),
  status: z.enum(ORDER_STATUSES),
});

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .refine(
      (value) => value.length >= 2 && value.length <= 40,
      "Nama harus 2-40 karakter",
    ),

  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s/g, ""))
    .transform((value) => (value === "" ? null : value))
    .refine(
      (value) => value === null || /^\+?\d{8,15}$/.test(value),
      "Nomor telepon tidak valid",
    ),

  address: z
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .refine(
      (value) => value === null || value.length <= 200,
      "Alamat maksimal 200 karakter",
    ),
});
