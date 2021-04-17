import Animal from './animal.js';

/**
 * Class representing a Bird
 * @extends Animal
 */
class Bird extends Animal {
  /**
   * Creating a bird
   * @param {String} species - the species of the bird
   * @param {String} weight - the weight of the bird
   * @param {String} diet - the diet of the bird
   * @param {Object} height - the height of the bird
   * @param {String} height.feet - the height of the bird in feet
   * @param {String} height.inches - the height of the bird in inches
   * @param {String} when - when the bird was discovered
   * @param {String} where - where the bird was discovered
   * @param {String} fact - a fact about the bird
   * @param {Object} image - an image of the bird
   * @param {String} image.src - a src of the bird's image
   * @param {String} image.alt - an alternate text of the bird's image
   * @returns {Bird} a Bird object
   */
  constructor({ species, weight, height, diet, when, where, fact, image }) {
    super({ species, weight, height, diet, when, where, fact, image });
  }
}

export default Bird;
