import { Dinosaur, Grid, Tile, Bird } from './objects/index.js';

/**
 * Handle generation of tiles & their placement in a grid
 * - manage the position of specific tiles such as human tile(should be at the center of the grid)
 */
const tiles = ( function() {
  const getSampleData = async () => await (await fetch('./dino.json')).json();


  return {
    async render(humanData) {
      /**
       * create tiles
       *  - 1 human tile
       *  - 7 dinosaur tiles
       *  - 1 bird tile
       *
       */
      if (humanData) {
        const { dinos: dinoData, pigeon: birdData } = await getSampleData();
        const dinoTiles = [];

        dinoData.forEach((dino) => {
          const dinoInstance = new Dinosaur(dino);
          const dinoTile = new Tile({
            header: dinoInstance.species,
            body: {
              paragraphs: [dinoInstance.fact],
            },
          });

          dinoTiles.push(dinoTile);
        });

        // create a grid
        const bird = new Bird(birdData);
        const birdTile = new Tile({
          header: bird.species,
            body: {
              paragraphs: [bird.fact],
            },
        });


        const humanTile = new Tile({
          header: humanData.name,
          body: {
            paragraphs: [`${humanData.name} human eats ${humanData.diet} and weighs ${humanData.weight}`],
          },
        });

       dinoTiles.push(birdTile);
       dinoTiles.push(humanTile);

       console.log('---------> dinoTiles: ', dinoTiles);
       const grid = new Grid(dinoTiles);
       console.log('--------> grid: ', grid);
       return grid;
      }
    },
  };
})();

export default tiles;
