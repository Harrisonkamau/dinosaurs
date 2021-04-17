/**
 * Class representing a User
 */
class User {
  /**
   * Creating a dinosaur
   * @param {String} name - the name of the user
   * @param {String} weight - the weight of the user
   * @param {Object} height - the height of the user
   * @param {String} height.feet - the height of the user in feet
   * @param {String} height.inches - the height of the user in inches
   * @param {String} diet - the diet of the user
   * @param {Object} image - an image of the user
   * @param {String} image.src - a src of the user's image
   * @param {String} image.alt - an alternate text of the user's image
   * @returns {User} a User object
   */
  constructor({ name, weight, height, diet, image = {} }) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.image = image;
  }
}

export default User;
