const { sort } = require("./sort");

describe("sort(width, height, length, mass)", () => {
  describe("STANDARD stack", () => {
    test("returns STANDARD for a small, light package", () => {
      expect(sort(10, 10, 10, 5)).toBe("STANDARD");
    });

    test("returns STANDARD when volume is just below 1,000,000 cm³ and mass < 20 kg", () => {
      // 99 * 100 * 100 = 990,000 < 1,000,000
      expect(sort(99, 100, 100, 19)).toBe("STANDARD");
    });

    test("returns STANDARD when all dimensions are just below 150 cm and mass < 20 kg", () => {
      expect(sort(149, 1, 1, 1)).toBe("STANDARD");
    });
  });

  describe("SPECIAL stack – bulky only", () => {
    test("returns SPECIAL when volume equals 1,000,000 cm³ (boundary)", () => {
      // 100 * 100 * 100 = 1,000,000
      expect(sort(100, 100, 100, 5)).toBe("SPECIAL");
    });

    test("returns SPECIAL when volume exceeds 1,000,000 cm³", () => {
      expect(sort(200, 50, 100, 5)).toBe("SPECIAL");
    });

    test("returns SPECIAL when width equals 150 cm (boundary)", () => {
      expect(sort(150, 1, 1, 5)).toBe("SPECIAL");
    });

    test("returns SPECIAL when height equals 150 cm (boundary)", () => {
      expect(sort(1, 150, 1, 5)).toBe("SPECIAL");
    });

    test("returns SPECIAL when length equals 150 cm (boundary)", () => {
      expect(sort(1, 1, 150, 5)).toBe("SPECIAL");
    });

    test("returns SPECIAL when a dimension exceeds 150 cm", () => {
      expect(sort(200, 10, 10, 5)).toBe("SPECIAL");
    });
  });

  describe("SPECIAL stack – heavy only", () => {
    test("returns SPECIAL when mass equals 20 kg (boundary)", () => {
      expect(sort(10, 10, 10, 20)).toBe("SPECIAL");
    });

    test("returns SPECIAL when mass exceeds 20 kg", () => {
      expect(sort(10, 10, 10, 25)).toBe("SPECIAL");
    });
  });

  describe("REJECTED stack – both bulky and heavy", () => {
    test("returns REJECTED when package is both bulky (volume) and heavy", () => {
      expect(sort(100, 100, 100, 20)).toBe("REJECTED");
    });

    test("returns REJECTED when package is both bulky (dimension) and heavy", () => {
      expect(sort(150, 10, 10, 20)).toBe("REJECTED");
    });

    test("returns REJECTED for very large and very heavy package", () => {
      expect(sort(500, 500, 500, 100)).toBe("REJECTED");
    });
  });

  describe("boundary / edge cases", () => {
    test("volume exactly 999,999 cm³ with light mass → STANDARD", () => {
      // 999 * 1 * 1000... let's use 99.9999 approach with integers:
      // 99 * 101 * 100 = 999,900 < 1,000,000 → STANDARD
      expect(sort(99, 101, 100, 1)).toBe("STANDARD");
    });

    test("mass of 19 kg is not heavy → STANDARD", () => {
      expect(sort(1, 1, 1, 19)).toBe("STANDARD");
    });

    test("package with dimension exactly 150 and mass exactly 20 → REJECTED", () => {
      expect(sort(150, 1, 1, 20)).toBe("REJECTED");
    });
  });
});
