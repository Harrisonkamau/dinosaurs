function populateValidationErrors({ errors, fields }) {
  fields.forEach((field) => {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('form-input__span');
    const parentDiv = document.getElementById(`${field}-parent-div`);

    if (Object.hasOwnProperty.call(errors, field)) {
      errorSpan.innerText = errors[field];

      parentDiv.firstChild.nextSibling.classList.add('form-input_error_border');
      parentDiv.appendChild(errorSpan);
    }
  });
}

export default populateValidationErrors;
