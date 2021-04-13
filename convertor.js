const convertor = (function () {
  const ONE_KG_IN_POUNDS = 2.205;
  const ONE_FOOT_IN_INCHES = 12;
  const ONE_METRE_IN_FEET = 3.281;

  return {
    poundsToKgs(pounds) {
      // round off to the nearest 100
      return Math.round((pounds / ONE_KG_IN_POUNDS)/ 100) * 100;
    },

    inchesToFeet(inches) {
      return Math.round(inches / ONE_FOOT_IN_INCHES);
    },

    metreToFeet(metre) {
      return Math.floor(metre * ONE_METRE_IN_FEET);
    }
  };
})();

export default convertor;
