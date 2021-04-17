/**
 * Creates a DOM element
 * @param {string} tag - the type of HTML tag to generate E.g. div, p, h2, span, etc.
 * @param {string} className - the name of the class to assign to the element
 * @param {string} id - the id of the class to assign to the element
 * @param {Array.<any>} children - array of DOM elements
 * @param {Object.<any>} metadata - an object of data to attach to the DOM element (used to render statistics)
 * @returns {Object} DOM element
 */
function createDomElement({ tag, className = '', id = '', data = '', children = [], metadata = {} }) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.innerText = data;

  if (children && children.length > 0) {
    children.forEach((childElement) => element.appendChild(childElement));
  }

  if (tag === 'img' && data && data.src) {
    element.src = data.src;
    element.alt = data.alt || '';
  }

  if (id) {
    element.setAttribute('id', id);
  }

  if (metadata) {
    element.metadata = metadata;
  }

  return element;
}

export default createDomElement;
