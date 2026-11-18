import { describe, expect, it } from "vitest";

import {
  getChristmasCountdown,
  PLANNER_CHECKOUT_URL,
  PLANNER_PRICE,
} from "@/lib/planner-offer";

describe("The Calm Christmas Planner offer", () => {
  it("uses the $12.99 price from the product brief", () => {
    expect(PLANNER_PRICE).toBe(12.99);
  });

  it("sends every purchase button to the specified Gumroad checkout", () => {
    expect(PLANNER_CHECKOUT_URL).toBe("https://twpub.gumroad.com/l/christmasplanner");
  });

  it("counts the days until Christmas Day", () => {
    expect(getChristmasCountdown(new Date(2026, 10, 17, 22, 6))).toBe(38);
  });

  it("shows zero days remaining on Christmas Day", () => {
    expect(getChristmasCountdown(new Date(2026, 11, 25, 12))).toBe(0);
  });

  it("hides the countdown after December 25", () => {
    expect(getChristmasCountdown(new Date(2026, 11, 26))).toBeNull();
  });

  it("counts down across the final 24 hours of Christmas Eve", () => {
    expect(getChristmasCountdown(new Date(2026, 11, 24, 23))).toBe(1);
  });
});