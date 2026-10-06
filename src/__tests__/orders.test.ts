import { describe, expect, it } from "vitest";
import {
  canTransition,
  isOrderStatus,
  nextStatuses,
} from "@/lib/orders";

describe("Order status rules", () => {
  it("pending hanya bisa menjadi preparing atau cancelled", () => {
    expect(nextStatuses("pending")).toEqual([
      "preparing",
      "cancelled",
    ]);
  });

  it("ready tidak boleh kembali ke pending", () => {
    expect(canTransition("ready", "pending")).toBe(false);
  });

  it("shipped bukan status order yang valid", () => {
    expect(isOrderStatus("shipped")).toBe(false);
  });

  it("pending boleh menjadi preparing", () => {
    expect(canTransition("pending", "preparing")).toBe(true);
  });

  it("preparing boleh menjadi ready", () => {
    expect(canTransition("preparing", "ready")).toBe(true);
  });

  it("delivered adalah status final", () => {
    expect(nextStatuses("delivered")).toEqual([]);
  });

  it("cancelled adalah status final", () => {
    expect(nextStatuses("cancelled")).toEqual([]);
  });
});
