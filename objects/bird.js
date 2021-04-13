import Animal from './animal.js';

class Bird extends Animal {
  constructor({ species, weight, height, diet, when, where, fact, image }) {
    super({ species, weight, height, diet, when, where, fact, image });
  }
}

export default Bird;
