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

  const pickRandomDinos = (dinos, maximum = 3) => {
    const randomItems = [];

    for(let i = 0; i < maximum; i++) {
      const randomDino = dinos[Math.floor(Math.random() * dinos.length)];

      switch(i) {
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
          body: {
            paragraphs: [dinoInstance.fact],
            image: dinoInstance.image,
          },
        }));

        const bird = new Bird(birdData);
        const birdTile = new Tile({
          header: bird.species,
            body: {
              paragraphs: [bird.fact],
              image: bird.image,
            },
        });


        const humanTile = new Tile({
          header: humanData.name,
          body: {
            paragraphs: [`${humanData.name} human is an ${humanData.diet} and weighs ${humanData.weight} kgs`],
            image: {
              src: './images/human.jpg',
              alt: 'Human Being',
            },
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
