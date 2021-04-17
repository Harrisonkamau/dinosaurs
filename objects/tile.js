import createDomElement from '../createDomElement.js';

/**
 * @param {String} header
 * @param {Object} body
 * @param {Array.<string>} body.paragraphs
 *  - E.g ['parapraphOne', 'paragraphTwo']
 */
class Tile {
  constructor({ header, body = {}, metadata = {} }) {
    this.header = header;
    this.body = body;
    this.metadata = metadata;
  }

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
