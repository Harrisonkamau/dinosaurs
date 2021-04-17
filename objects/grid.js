import Tile from './tile.js';

/**
 * Represents a grid
 */
class Grid {
  /**
   * Creating a grid of tiles
   * @param {Array} tiles - the species of the animal
   * @param {Tile} tile - a Tile object
   * @returns {Grid} a Grid object
   */
  constructor(tiles = []) {
    this.tiles = tiles;
    this.mainDiv = document.getElementById('grid-tiles');
  }

  /**
   * Generate a 3x3 grid of tiles
   */
  generateRows() {
    this.clear();
    this.tiles.forEach((tile) => {
      if (tile instanceof Tile) {
        const tileElement = tile.generate();

        if (tileElement) {
          this.mainDiv.appendChild(tileElement);
          this.mainDiv.classList.add('grid-tiles');
        }
      }
    });
  }

  /**
   * Destroys a grid
   */
  clear() {
    if (this.mainDiv.children) {
      const childElements = Array.from(this.mainDiv.children);
      childElements.forEach((child) => child.remove());
    }
  }
}

export default Grid;
