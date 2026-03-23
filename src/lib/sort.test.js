import { describe, expect, it } from "vitest";
import {
  BULKY_DIMENSION_THRESHOLD,
  BULKY_VOLUME_THRESHOLD,
  HEAVY_MASS_THRESHOLD,
  classifyPackage,
  sort
} from "./sort";

describe("sort", () => {
  it("returns STANDARD when the package is neither bulky nor heavy", () => {
    expect(sort(50, 40, 30, 10)).toBe("STANDARD");
  });

  it("returns SPECIAL when the package is heavy only", () => {
    expect(sort(50, 40, 30, HEAVY_MASS_THRESHOLD)).toBe("SPECIAL");
  });

  it("returns SPECIAL when the package is bulky because of volume", () => {
    expect(sort(100, 100, 100, 10)).toBe("SPECIAL");
  });

  it("returns SPECIAL when the package is bulky because of a dimension threshold", () => {
    expect(sort(BULKY_DIMENSION_THRESHOLD, 20, 20, 5)).toBe("SPECIAL");
  });

  it("returns REJECTED when the package is both bulky and heavy", () => {
    expect(sort(200, 100, 100, 30)).toBe("REJECTED");
  });

  it("treats threshold values as inclusive", () => {
    const result = classifyPackage(
      100,
      100,
      BULKY_VOLUME_THRESHOLD / (100 * 100),
      HEAVY_MASS_THRESHOLD
    );

    expect(result.bulky).toBe(true);
    expect(result.heavy).toBe(true);
    expect(result.stack).toBe("REJECTED");
  });

  it("throws for negative values", () => {
    expect(() => sort(-1, 10, 10, 10)).toThrow("width cannot be negative.");
  });

  it("throws for non-finite values", () => {
    expect(() => sort(Number.NaN, 10, 10, 10)).toThrow(
      "width must be a finite number."
    );
  });
});
