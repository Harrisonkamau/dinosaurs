import Tile from './tile.js';

class Grid {
  constructor(tiles = []) {
    this.tiles = tiles;
    this.mainDiv = document.getElementById('grid-tiles');
  }

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

  clear() {
    if (this.mainDiv.children) {
      const childElements = Array.from(this.mainDiv.children);
      childElements.forEach((child) => child.remove());
    }
  }
}

export default Grid;
