import createDomElement from './createDomElement.js';

const renderTileOverlay = (function () {
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

  function hasMetadataDiv(element) {
    const classNames = Array.from(element.children).map(({ className }) => className);
    return classNames.includes('grid-tile-metadata');
  }

  function getOriginalChildren(element) {
    const originalChildren = Array.from(element.children).filter(({ className }) => !className.includes('metadata'));
    return originalChildren;
  }

  function hideOriginalChildren(element) {
    const originalChildren = getOriginalChildren(element);

    originalChildren.forEach((child) => {
      const clone = child.cloneNode(true);
      clone.style.visibility = 'hidden';
      element.removeChild(child);
      element.appendChild(clone);
    });
  }

  function hideMetadata(element) {
    const newElement = Array.from(element.children).map((child) => {
      if (child.className === 'grid-tile-metadata') {
        element.removeChild(child);
      }

      return element;
    });

    return newElement;
  }

  function renderMetadataTags(element, children) {
    if (!hasMetadataDiv(element)) {
      children.forEach((child) => {
        element.insertBefore(child, element.firstChild);
      });

      hideOriginalChildren(element);
    }
  }

  function renderOriginalChildren(element) {
    if (hasMetadataDiv(element)) {
      hideMetadata(element);
    }

    Array.from(element.children).forEach((child) => {
      child.style.visibility = 'visible';
    });
  }

  return {
    hide(gridTile) {
      renderOriginalChildren(gridTile);
    },
    show(gridTile) {
      const metadataDiv = generateMetadataDiv(gridTile.metadata);
      renderMetadataTags(gridTile, [metadataDiv]);
    },
  };
}());

export default renderTileOverlay;
