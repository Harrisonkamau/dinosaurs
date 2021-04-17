/**
 * converts pounds, inches, metres SI units to respective units
 */
const convertor = (function () {
  const ONE_KG_IN_POUNDS = 2.205;
  const ONE_FOOT_IN_INCHES = 12;
  const ONE_METRE_IN_FEET = 3.281;

  return {
    /**
     * Converts pounds to Kilograms
     * @param {number} pounds
     * @returns {number} kilograms
     */
    poundsToKgs(pounds) {
      // round off to the nearest 100
      return Math.round((pounds / ONE_KG_IN_POUNDS) / 100) * 100;
    },

    /**
     * Converts inches to Foot
     * @param {number} inches
     * @returns {number} feet
     */
    inchesToFeet(inches) {
      return Math.round(inches / ONE_FOOT_IN_INCHES);
    },

    /**
     * Converts metre to Foot
     * @param {number} inches
     * @returns {number} feet
     */
    metreToFeet(metre) {
      return Math.floor(metre * ONE_METRE_IN_FEET);
    },
  };
}());

export default convertor;
