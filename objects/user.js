class User {
  constructor({ name, weight, height, diet, image = {} }) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.image = image;
  }
}

export default User;
