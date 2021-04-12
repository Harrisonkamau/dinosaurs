// *.js extension is the secret to making this load in the browser
import validateForm from './validateForm.js';
import populateValidationErrors from './populateValidationErrors.js';
import form from './handleFormView.js';
import grid from './handleTilesView.js';
import User from './objects/user.js';
import tiles from './renderTiles.js';

document.addEventListener('DOMContentLoaded', async () => {
  // grid should be hidden by default
  grid.hide();

  const submitButton = document.getElementById('submitButton');
  const getStarted = document.getElementById('get-started');
  const name = document.getElementById('name');
  const weight = document.getElementById('weight');
  const heightFeet = document.getElementById('feet');
  const heightInches = document.getElementById('inches');
  const diet = document.getElementById('diet');

  // handle form validation, grid display and form hiding
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const userData = {
      name: name.value,
      weight: Number(weight.value),
      diet: diet.value,
      height: {
        feet: Number(heightFeet.value),
        inches: Number(heightInches.value),
      },
    };

    const result = validateForm(userData);

    if (result && result.errors && Object.values(result.errors).length > 0) {
      populateValidationErrors({
        errors: result.errors,
        fields: ['name', 'weight', 'diet', 'inches', 'feet'],
      });
    }

    if(result && result.formData && Object.keys(result.formData).length > 0) {
      // CLEAR ANY ERROR SPANS & hide form
      const errorSpans = document.getElementsByClassName('form-input__span');
      const parentDivs = document.getElementsByClassName('form-input');
      Array.from(errorSpans).forEach((errorSpan) => errorSpan.innerText = '');
      Array.from(parentDivs).forEach((parentDiv) => parentDiv.classList.remove('form-input_error_border'));

      form.hide();
      grid.show();

      const humanData = new User(userData);
      const gridTiles = await tiles.render(humanData);
      gridTiles.generateRows();
    }
  });

  // handle create new infographic (renders the form page)
  getStarted.addEventListener('click', (event) => {
    event.preventDefault();

    grid.hide();
    form.show();
  });
});
