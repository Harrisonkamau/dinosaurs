const convertor = (function () {
  const ONE_KG_IN_POUNDS = 2.205;

  return {
    poundsToKgs(pounds) {
      // round off to the nearest 100
      return Math.round((pounds / ONE_KG_IN_POUNDS)/ 100) * 100;
    },
  };
})();

export default convertor;
