import createDomElement from './createDomElement.js';

/**
 * Renders a tile statistics on hover
 */
const renderTileOverlay = (function () {
  /**
   * Creates DOM elements for the respective object metadata
   * @param {Object.<any>} metadata - the statistics object
   * @returns {any} DOM element with metadata or an error object
   */
  function generateMetadataDiv(metadata) {
    if (metadata && Object.keys(metadata).length > 0) {
      const forbiddenKeys = ['image', 'human', 'fact', 'height'];

      const metadataChildren = [];

      Object.keys(metadata).forEach((key) => {
        if (!forbiddenKeys.includes(key)) {
          const strong = createDomElement({
            tag: 'strong',
            className: 'grid-tile-metadata_strong',
            data: `${key}: `,
          });

          const span = createDomElement({
            tag: 'span',
            className: 'grid-tile-metadata_span',
            data: metadata[key],
          });
          const metadataParagraph = createDomElement({
            tag: 'p',
            className: 'grid-tile-metadata_paragraph',
            children: [strong, span],
          });

          metadataChildren.push(metadataParagraph);
        }
      });

      const metadataDiv = createDomElement({
        tag: 'div',
        className: 'grid-tile-metadata',
        children: metadataChildren,
      });

      return metadataDiv;
    }

    return { error: 'No metadata provided' };
  }

  /**
   * Checks whether a tile has metadata DOM element
   * @param {Object.<any>} element - DOM Element
   * @returns {Boolean} true or false
   */
  function hasMetadataDiv(element) {
    const classNames = Array.from(element.children).map(({ className }) => className);
    return classNames.includes('grid-tile-metadata');
  }

  /**
   * Retrieves all the children of the element before adding metadata DOM element
   * @param {Object.<any>} element - DOM Element
   * @returns {Array.<any>} an array of DOM elements
   */
  function getOriginalChildren(element) {
    const originalChildren = Array.from(element.children).filter(({ className }) => !className.includes('metadata'));
    return originalChildren;
  }

  /**
   * Hides all the default tile DOM element children
   * @param {Object.<any>} element - DOM Element
   * @returns {Object.<any>} a DOM element with hidden children elements
   */
  function hideOriginalChildren(element) {
    const originalChildren = getOriginalChildren(element);

    originalChildren.forEach((child) => {
      const clone = child.cloneNode(true);
      clone.style.visibility = 'hidden';
      element.removeChild(child);
      element.appendChild(clone);
    });
  }

  /**
   * Removes the metadata DOM element from the parent
   * @param {Object.<any>} element - DOM Element
   * @returns {Object.<any>} a DOM element without metadata element & its children
   */
  function removeMetadata(element) {
    const newElement = Array.from(element.children).map((child) => {
      if (child.className === 'grid-tile-metadata') {
        element.removeChild(child);
      }

      return element;
    });

    return newElement;
  }

  /**
   * Renders the statistics DOM elements as the first children
   * - Hides the default tile children elements
   * @param {Object.<any>} element - DOM Element
   * @returns {Object.<any>} a DOM element with metadata element minus the original children
   */
  function renderMetadataTags(element, children) {
    if (!hasMetadataDiv(element)) {
      children.forEach((child) => {
        element.insertBefore(child, element.firstChild);
      });

      hideOriginalChildren(element);
    }
  }

  /**
   * Removes the statistics DOM element if found &
   * Renders the default tile elements before hover
   * @param {Object.<any>} element - DOM Element
   * @returns {Object.<any>} a DOM element with default tile elements minus the statistics elements
   */
  function renderOriginalChildren(element) {
    if (hasMetadataDiv(element)) {
      removeMetadata(element);
    }

    Array.from(element.children).forEach((child) => {
      child.style.visibility = 'visible';
    });
  }

  return {
    /**
     * Hides statistics elements on mouse out
     * @param {Object.<any>} gridTile - DOM Element
     */
    hide(gridTile) {
      renderOriginalChildren(gridTile);
    },
    /**
     * Generates & shows statistics elements on mouse over
     * @param {Object.<any>} gridTile - DOM Element
     */
    show(gridTile) {
      const metadataDiv = generateMetadataDiv(gridTile.metadata);
      renderMetadataTags(gridTile, [metadataDiv]);
    },
  };
}());

export default renderTileOverlay;
