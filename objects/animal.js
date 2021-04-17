/**
 * Class representing an animal
 */
class Animal {
  /**
   * Creating an animal
   * @param {String} species - the species of the animal
   * @param {String} weight - the weight of the animal
   * @param {Object} height - the height of the animal
   * @param {String} height.feet - the height of the animal in feet
   * @param {String} height.inches - the height of the animal in inches
   * @param {String} diet - the diet of the animal
   * @param {String} when - when the animal was discovered
   * @param {String} where - where the animal was discovered
   * @param {String} fact - a fact about the animal
   * @param {Object} image - an image of the animal
   * @param {String} image.src - a src of the animal's image
   * @param {String} image.alt - an alternate text of the animal's image
   * @returns {Animal} an Animal object
   */
  constructor({ species, weight, height, diet, when, where, fact, image }) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.fact = fact;
    this.when = when;
    this.where = where;
    this.image = image;
  }
}

export default Animal;
