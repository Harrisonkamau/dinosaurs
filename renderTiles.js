import { Dinosaur, Grid, Tile, Bird } from './objects/index.js';

/**
 * Handle generation of tiles & their placement in a grid
 * - manage the position of specific tiles such as human tile(should be at the center of the grid)
 */
const tiles = (function () {
  const getSampleData = async () => {
    const result = await (await fetch('./dino.json')).json();
    return result;
  };

  const centreHumanTile = (allTiles, humanTile) => {
    const copyTiles = [...allTiles];
    const humanTilePosition = copyTiles.indexOf(humanTile);
    const midPosition = Math.floor(copyTiles.length / 2);
    [copyTiles[midPosition], copyTiles[humanTilePosition]] = [copyTiles[humanTilePosition], copyTiles[midPosition]];
    return copyTiles;
  };

  const pickRandomDinos = (dinos, maximum = 3) => {
    const randomItems = [];

    for (let i = 0; i < maximum; i++) {
      const randomDino = dinos[Math.floor(Math.random() * dinos.length)];

      switch (i) {
        case 0:
          randomDino.compareWithHumanWeight();
          break;
        case 1:
          randomDino.compareWithHumanDiet();
          break;
        case 2:
          randomDino.compareWithHumanHeight();
      }

      randomItems.push(randomDino);
    }

    return randomItems;
  };

  return {
    async render(humanData) {
      if (humanData) {
        const { dinos: dinoData, pigeon: birdData } = await getSampleData();
        const dinoInstances = dinoData.map((dino) => new Dinosaur({ ...dino, human: humanData }));
        const dinosWithRandomFacts = new Set(dinoInstances.concat(pickRandomDinos(dinoInstances)));
        const dinoTiles = Array.from(dinosWithRandomFacts).map((dinoInstance) => new Tile({
          header: dinoInstance.species,
          metadata: dinoInstance,
          body: {
            paragraphs: [dinoInstance.fact],
            image: dinoInstance.image,
          },
        }));

        const bird = new Bird(birdData);
        const birdTile = new Tile({
          header: bird.species,
          metadata: bird,
          body: {
            paragraphs: [bird.fact],
            image: bird.image,
          },
        });

        const humanTile = new Tile({
          header: humanData.name,
          metadata: humanData,
          body: {
            paragraphs: [`${humanData.name} is an ${humanData.diet} and weighs ${humanData.weight} kgs`],
            image: humanData.image,
          },
        });

        dinoTiles.push(birdTile);
        dinoTiles.push(humanTile);

        const reOrderedTiles = centreHumanTile(dinoTiles, humanTile);
        const grid = new Grid(reOrderedTiles);
        return grid;
      }

      return { error: 'No Human data provided' };
    },
  };
}());

export default tiles;
