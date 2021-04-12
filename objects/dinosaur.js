import convertor from '../convertor.js';
import Animal from './animal.js';

class Dinosaur extends Animal {
  constructor({ species, weight, height, diet, when, where, fact, human = {} }) {
    super({ species, weight, height, diet, when, where, fact });
    this.human = human;
  }

  compareWithHumanWeight() {
    if (this.human && this.human.weight) {
      const weightInKgs = convertor.poundsToKgs(this.weight);
      const difference = Math.floor(weightInKgs / this.human.weight);

      return `A typical ${this.species} dinosaur weighs ${difference} times more than humans in kgs`;
    }
  }
}

export default Dinosaur;
