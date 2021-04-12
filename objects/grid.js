import Tile from './tile.js';

/**
 * Generate grid for each row
 */
 class Grid {
   constructor(tiles = []) {
    this.tiles = tiles;
   }

   generateRow() {
    const mainDiv = document.getElementById('grid-tiles');
     // only generate the tiles we've created ourselves
     this.tiles.forEach(tile => {
       if (tile instanceof Tile) {
        const tileElement = tile.generate();
        mainDiv.appendChild(tileElement);
        mainDiv.classList.add('grid-tiles');
       }
     });
   }
 }

 export default Grid;
