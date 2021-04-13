import convertor from '../convertor.js';
import Animal from './animal.js';

function _isPositive(num) {
  return num > 0;
}

function formatDiet(diet) {
  return diet.concat('s');
}

class Dinosaur extends Animal {
  constructor({ species, weight, height, diet, when, where, fact, image, human = {} }) {
    super({ species, weight, height, diet, when, where, fact, image });
    this.human = human;
  }

  compareWithHumanWeight() {
    if (this.human && this.human.weight) {
      const weightInKgs = convertor.poundsToKgs(this.weight);
      const difference = weightInKgs / this.human.weight;

      if (_isPositive(difference)) {
        this.fact = `A typical ${this.species} dinosaur weighs atleast ${Math.floor(difference)} times more than humans.`;
      } else {
        this.fact = `A human weighing ${this.human.weight} kgs would have been heavier than a ${this.species} dinosaur.`;
      }
    }
  }

  compareWithHumanDiet() {
    if (this.human && this.human.diet) {
      const sameDiet = this.human.diet === this.diet;

      if (sameDiet) {
        this.fact = `${this.species} dinosaurs' diet that their diet is almost similar to humans.`;
      } else {
        this.fact = `${this.species} dinosaurs are ${formatDiet(this.diet)} while humans are ${formatDiet(this.human.diet)}.`;
      }
    }
  }

  compareWithHumanHeight() {
    if (this.human && this.human.height) {
      const dinoHeightInFeet = convertor.metreToFeet(this.height);
      const humanHeightInFeet = convertor.inchesToFeet(this.human.height.inches) + this.human.height.feet;

      const difference = dinoHeightInFeet - humanHeightInFeet;
      if (_isPositive(difference)) {
        this.fact = `A typical ${this.species} dinosaur is atleast ${Math.floor(difference)} feet taller than a human being.`;
      } else {
        this.fact = `A human with a height of ${humanHeightInFeet} feet would have been taller than a ${this.species} dinosaur.`;
      }
    }
  }
}

export default Dinosaur;
