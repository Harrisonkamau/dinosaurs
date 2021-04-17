import createDomElement from '../createDomElement.js';

/**
 * Represents a tile
 */
class Tile {
  /**
   * Creating a tile object
   * @param {String} header - the heading of the tile
   * @param {Object} body - a body of the tile
   * @param {Object} body.image - the image of the object to render in a tile
   * @param {String} body.image - the image of the object to render in a tile
   * @param {Array.<string>} body.paragraphs - an array of paragraphs (comma separated)
   * @param {Object.<any>} metadata - the metadata of the object being rendered in a tile
   * @returns {Tile} a Tile object
   */
  constructor({ header, body = {}, metadata = {} }) {
    this.header = header;
    this.body = body;
    this.metadata = metadata;
  }

  /**
   * Creates tile data (DOM elements)
   */
  generate() {
    const children = [];
    const header = createDomElement({ tag: 'h1', className: 'grid-tile-title', data: this.header });
    const image = createDomElement({ tag: 'img', className: 'grid-tile-img', data: this.body.image });

    children.push(image);
    children.push(header);

    if (this.hasMultipleParagraphs()) {
      this.body.paragraphs.forEach((paragraph) => {
        const element = createDomElement({ tag: 'p', className: 'grid-tile-paragraph', data: paragraph });
        children.push(element);
      });
    }

    if (this.hasParagraphs() && !this.hasMultipleParagraphs()) {
      const paragraph = createDomElement({ tag: 'p', className: 'grid-tile-paragraph', data: this.body.paragraphs[0] });
      children.push(paragraph);
    }

    const parentDiv = createDomElement({ children, tag: 'div', className: 'grid-tile', metadata: this.metadata });

    return parentDiv;
  }

  hasParagraphs() {
    return this.body && Object.hasOwnProperty.call(this.body, 'paragraphs');
  }

  hasMultipleParagraphs() {
    return this.hasParagraphs() && this.body.paragraphs.length > 1;
  }

  hasImage() {
    return this.body && this.body.image;
  }
}

export default Tile;
