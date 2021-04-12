import Tile from './tile.js';

 class Grid {
   constructor(tiles = []) {
    this.tiles = tiles;
    this.mainDiv = document.getElementById('grid-tiles');
   }

   generateRows() {
     this.clear();
     // only generate the tiles we've created ourselves
     this.tiles.forEach(tile => {
       if (tile instanceof Tile) {
        const tileElement = tile.generate();
        this.mainDiv.appendChild(tileElement);
        this.mainDiv.classList.add('grid-tiles');
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
