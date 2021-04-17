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
    const header = this.createDomElement({ tag: 'h1', className: 'grid-tile-title', data: this.header });
    const image = this.createDomElement({ tag: 'img', className: 'grid-tile-img', data: this.body.image });

    children.push(image);
    children.push(header);

    if (this.hasMultipleParagraphs()) {
      this.body.paragraphs.forEach((paragraph) => {
        const element = this.createDomElement({ tag: 'p', className: 'grid-tile-paragraph', data: paragraph });
        children.push(element);
      });
    }

    if (this.hasParagraphs() && !this.hasMultipleParagraphs()) {
      const paragraph = this.createDomElement({ tag: 'p', className: 'grid-tile-paragraph', data: this.body.paragraphs[0] });
      children.push(paragraph);
    }

    const parentDiv = this.createDomElement({ children, tag: 'div', className: 'grid-tile' });

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

  createDomElement = ({ tag, className = '', id = '', data = '', children = [] }) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.innerText = data;

    if (children && children.length > 0) {
      children.forEach((childElement) => element.appendChild(childElement));
    }

    if (tag === 'img' && data && data.src) {
      element.src = data.src;
      element.alt = data.alt;
    }

    if (id) {
      element.setAttribute('id', id);
    }

    return element;
  }
}

export default Tile;
