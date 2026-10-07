import { describe, expect, it } from "vitest";
import { profileSchema } from "@/lib/schemas";

describe("profileSchema", () => {
  it("accepts valid profile and trims name", () => {
    const result = profileSchema.safeParse({
      name: "  VronyX   ",
      phone: "08123 456789",
      address: "Mars",
    });
    expect(result.success && result.data).toEqual({
      name: "VronyX",
      phone: "08123456789",
      address: "Mars",
    });
  });

  it("rejects invalid name and phone", () => {
    expect(
      profileSchema.safeParse({
        name: "c",
        phone: "08123456789",
      }).success,
    ).toBe(false);
    expect(
      profileSchema.safeParse({ name: "VronyX", phone: "08123" }).success,
    ).toBe(false);
    expect(
      profileSchema.safeParse({ name: "123", phone: "08123456789" }).success,
    ).toBe(false);
  });

  it("converts empty phone and address to null", () => {
    const result = profileSchema.safeParse({
      name: "VronyX",
      phone: "",
      address: "",
    });

    expect(result.success && result.data).toEqual({
      name: "VronyX",
      phone: null,
      address: null,
    });
  });
});
