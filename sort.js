/**
 * Dispatches a package to the correct stack based on its volume and mass.
 *
 * A package is bulky if:
 *   - Its volume (width × height × length) >= 1,000,000 cm³, OR
 *   - Any single dimension >= 150 cm.
 *
 * A package is heavy if its mass >= 20 kg.
 *
 * Stack assignment:
 *   - REJECTED  : both bulky and heavy
 *   - SPECIAL   : either bulky or heavy (but not both)
 *   - STANDARD  : neither bulky nor heavy
 *
 * @param {number} width  - Width in centimeters
 * @param {number} height - Height in centimeters
 * @param {number} length - Length in centimeters
 * @param {number} mass   - Mass in kilograms
 * @returns {string} Stack name: "STANDARD", "SPECIAL", or "REJECTED"
 */
function sort(width, height, length, mass) {
  const volume = width * height * length;
  const isBulky = volume >= 1_000_000 || width >= 150 || height >= 150 || length >= 150;
  const isHeavy = mass >= 20;

  if (isBulky && isHeavy) return "REJECTED";
  if (isBulky || isHeavy) return "SPECIAL";
  return "STANDARD";
}

module.exports = { sort };
