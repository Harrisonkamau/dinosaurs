import Animal from './animal.js';

class Bird extends Animal {
  constructor({ species, weight, height, diet, when, where, fact }) {
    super({ species, weight, height, diet, when, where, fact });
  }
}

export default Bird;
