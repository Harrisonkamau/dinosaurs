import { Dinosaur, Grid, Tile, Bird } from './objects/index.js';

/**
 * Handles generation of tiles & their placement in a grid
 * - manage the position of specific tiles such as human tile(should be at the center of the grid)
 */
const tiles = (function () {
  /**
   * Reads Dinosaur data from `dino.json` file
   * @returns {Object} An object of containing dinos (array of objects) & pigeon (an object)
   */
  const getSampleData = async () => {
    const result = await (await fetch('./dino.json')).json();
    return result;
  };

  /**
   * Places human tile at the center of the 9 tiles
   * @param {Array.<Tile>} allTiles - An array of tile objects
   * @param {Object.<Tile>} humanTile - an tile with human data
   * @returns {Array.<Tile>} an array of arranged tiles with the human tile at the middle
   */
  const centreHumanTile = (allTiles, humanTile) => {
    const copyTiles = [...allTiles];
    const humanTilePosition = copyTiles.indexOf(humanTile);
    const midPosition = Math.floor(copyTiles.length / 2);
    [copyTiles[midPosition], copyTiles[humanTilePosition]] = [copyTiles[humanTilePosition], copyTiles[midPosition]];
    return copyTiles;
  };

  /**
   * Picks random dinosaur objects to compare with Human data
   * @param {Array.<Dino>} dinos - Array of dino objects
   * @param {number} maximum - number of random dinosaurs to pick
   * @returns {any} Generates random facts for random dinosaurs
   */
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
    /**
     * Renders a grid of tiles
     * @param {Object.<User>} humanData - A User object
     * @returns {Object.<any>} grid object or an error object
     */
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
