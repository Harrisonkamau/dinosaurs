import convertor from '../convertor.js';
import Animal from './animal.js';

/**
 * Checks whether a number is a positive integer
 * @param {Number} num - a number to check
 * @returns {Boolean} - returns a boolean
 */
function isPositive(num) {
  return num > 0;
}

/**
 * Pluralizes a diet
 * @param {String} diet - a string to pluralize
 * @returns {String} - returns a string
 */
function formatDiet(diet) {
  return diet.concat('s');
}

/**
 * Class representing a Dinosaur
 * @extends Animal
 */
class Dinosaur extends Animal {
  /**
   * Creating a dinosaur
   * @param {String} species - the species of the dinosaur
   * @param {String} weight - the weight of the dinosaur
   * @param {Object} height - the height of the dinosaur
   * @param {String} height.feet - the height of the dinosaur in feet
   * @param {String} height.inches - the height of the dinosaur in inches
   * @param {String} diet - the diet of the dinosaur
   * @param {String} when - when the dinosaur was discovered
   * @param {String} where - where the dinosaur was discovered
   * @param {String} fact - a fact about the dinosaur
   * @param {Object} image - an image of the dinosaur
   * @param {String} image.src - a src of the dinosaur's image
   * @param {String} image.alt - an alternate text of the dinosaur's image
   * @param {Object} human - the human data object to compare a dinosaur object to
   * @param {String} human.weight - the weight of the user
   * @param {Object} human.height - the height of the user
   * @param {String} human.height.feet - the height of the user in feet
   * @param {String} human.height.inches - the height of the user in inches
   * @param {String} human.diet - the diet of the user
   * @returns {Dinosaur} a Dinosaur object
   */
  constructor({ species, weight, height, diet, when, where, fact, image, human = {} }) {
    super({ species, weight, height, diet, when, where, fact, image });
    this.human = human;
  }

  /**
   * Generates a random fact for a random dinosaur
   * - it compares the weights of the dinosaur and human
   */
  compareWithHumanWeight() {
    if (this.human && this.human.weight) {
      const weightInKgs = convertor.poundsToKgs(this.weight);
      const difference = weightInKgs / this.human.weight;

      if (isPositive(difference)) {
        this.fact = `A typical ${this.species} dinosaur weighs atleast ${Math.floor(difference)} times more than humans.`;
      } else {
        this.fact = `A human weighing ${this.human.weight} kgs would have been heavier than a ${this.species} dinosaur.`;
      }
    }
  }

  /**
   * Generates a random fact for a random dinosaur
   * - it compares the diets of the dinosaur and human
   */
  compareWithHumanDiet() {
    if (this.human && this.human.diet) {
      const sameDiet = this.human.diet === this.diet;

      if (sameDiet) {
        this.fact = `${this.species} dinosaurs' diet is almost similar to that of humans.`;
      } else {
        this.fact = `${this.species} dinosaurs are ${formatDiet(this.diet)} while humans are ${formatDiet(this.human.diet)}.`;
      }
    }
  }

  /**
   * Generates a random fact for a random dinosaur
   * - it compares the heights of the dinosaur and human
   */
  compareWithHumanHeight() {
    if (this.human && this.human.height) {
      const dinoHeightInFeet = convertor.metreToFeet(this.height);
      const humanHeightInFeet = convertor.inchesToFeet(this.human.height.inches) + this.human.height.feet;

      const difference = dinoHeightInFeet - humanHeightInFeet;
      if (isPositive(difference)) {
        this.fact = `A typical ${this.species} dinosaur is atleast ${Math.floor(difference)} feet taller than a human being.`;
      } else {
        this.fact = `A human with a height of ${humanHeightInFeet} feet would have been taller than a ${this.species} dinosaur.`;
      }
    }
  }
}

export default Dinosaur;
