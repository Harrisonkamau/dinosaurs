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
