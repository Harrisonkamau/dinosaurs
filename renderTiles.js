import { Dinosaur, Grid, Tile, Bird } from './objects/index.js';

/**
 * Handle generation of tiles & their placement in a grid
 * - manage the position of specific tiles such as human tile(should be at the center of the grid)
 */
const tiles = ( function() {
  const getSampleData = async () => await (await fetch('./dino.json')).json();

  const centreHumanTile = (allTiles, humanTile) => {
    const humanTilePosition = allTiles.indexOf(humanTile);
    const midPosition = Math.floor(allTiles.length / 2);
    [allTiles[midPosition], allTiles[humanTilePosition]] = [allTiles[humanTilePosition], allTiles[midPosition]];
    return allTiles;
  };

  return {
    async render(humanData) {
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
            paragraphs: [`${humanData.name} human is an ${humanData.diet} and weighs ${humanData.weight} kgs`],
          },
        });

       dinoTiles.push(birdTile);
       dinoTiles.push(humanTile);

       const reOrderedTiles = centreHumanTile(dinoTiles, humanTile);
       const grid = new Grid(reOrderedTiles);
       return grid;
      }
    },
  };
})();

export default tiles;
