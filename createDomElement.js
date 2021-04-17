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
