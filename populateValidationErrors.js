/**
 * Create a given number of spans to display form validation errors
 * @param {Object.<any>} errors - an object of validation errors to render
 * @param {Array.<any>} fields - an array of form fields
 * @returns {Object.<any>} DOM element with error spans populated
 */
function populateValidationErrors({ errors, fields }) {
  fields.forEach((field) => {
    const errorSpan = document.createElement('span');
    const parentDiv = document.getElementById(`${field}-parent-div`);
    errorSpan.classList.add('form-input__span');

    if (Object.hasOwnProperty.call(errors, field)) {
      errorSpan.innerText = errors[field];

      parentDiv.firstChild.nextSibling.classList.add('form-input_error_border');
      parentDiv.appendChild(errorSpan);
    }
  });
}

export default populateValidationErrors;
