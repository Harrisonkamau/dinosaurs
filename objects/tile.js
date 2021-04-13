/**
 * @param {String} header
 * @param {Object} body
 * @param {Array.<string>} body.paragraphs
 *  - E.g ['parapraphOne', 'paragraphTwo']
 */
class Tile {
  constructor({ header, body = {} }) {
    this.header = header;
    this.body = body;
  }

  generate() {
    const children = [];
    const h4 = this.createDomElement({ tag: 'h1', className: 'grid-tile-title', data: this.header });
    const img = this.createDomElement({ tag: 'img', className: 'grid-tile-img', data: this.body.image });

    children.push(img);
    children.push(h4);

    if (this.hasMultipleParagraphs()) {
      this.body.paragraphs.forEach((paragraph) => {
        const p = this.createDomElement({ tag: 'p', className: 'grid-tile-paragraph', data: paragraph });
        children.push(p);
      });
    }

    if(this.hasParagraphs() && !this.hasMultipleParagraphs()) {
      const p = this.createDomElement({ tag: 'p', className: 'grid-tile-paragraph', data: this.body.paragraphs[0] });
      children.push(p);
    }

    const parentDiv = this.createDomElement({ children, tag: 'div', className: 'grid-tile' });

    return parentDiv;
  }

  hasParagraphs() {
    return this.body && Object.hasOwnProperty.call(this.body, 'paragraphs');
  }

  hasMultipleParagraphs() {
   this.hasParagraphs() && this.body.paragraphs.length > 1;
  }

  hasImage() {
    this.body.image && this.body.image.length > 0;
  }

  createDomElement({ tag, className = '', data = '', children = [] }) {
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

    return element;
  }
}

export default Tile;
