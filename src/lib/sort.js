export const BULKY_VOLUME_THRESHOLD = 1_000_000;
export const BULKY_DIMENSION_THRESHOLD = 150;
export const HEAVY_MASS_THRESHOLD = 20;

function assertValidMeasurement(name, value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number.`);
  }

  if (value < 0) {
    throw new RangeError(`${name} cannot be negative.`);
  }
}

export function classifyPackage(width, height, length, mass) {
  assertValidMeasurement("width", width);
  assertValidMeasurement("height", height);
  assertValidMeasurement("length", length);
  assertValidMeasurement("mass", mass);

  const volume = width * height * length;
  const bulky =
    volume >= BULKY_VOLUME_THRESHOLD ||
    Math.max(width, height, length) >= BULKY_DIMENSION_THRESHOLD;
  const heavy = mass >= HEAVY_MASS_THRESHOLD;

  let stack = "STANDARD";
  let reason = "The package is neither bulky nor heavy.";

  if (bulky && heavy) {
    stack = "REJECTED";
    reason = "The package is both bulky and heavy, so it is rejected.";
  } else if (bulky || heavy) {
    stack = "SPECIAL";
    reason =
      "The package triggers exactly one flag, so it requires special handling.";
  }

  return {
    stack,
    bulky,
    heavy,
    volume,
    reason
  };
}

export function sort(width, height, length, mass) {
  return classifyPackage(width, height, length, mass).stack;
}
