const handleTiles = (function() {
  /**
   * Hides the grid/tiles
   * - sets the class grid/tiles to display 'none'
   */
  function hideTiles() {
    const grid = document.getElementById('grid-tiles');

    grid.classList.add('hideGrid');
    grid.classList.remove('showGrid');
  }

  /**
   * Shows the grid/tiles
   * - sets the class grid/tiles to display 'block'
   */
  function showTiles() {
    const grid = document.getElementById('grid-tiles');

    grid.classList.add('showGrid');
    grid.classList.remove('hideGrid');
  }

  return {
    show: showTiles,
    hide: hideTiles,
  }
})();


export default handleTiles;
