// *.js extension is the secret to making this load in the browser
import validateForm from './validateForm.js';
import populateValidationErrors from './populateValidationErrors.js';
import form from './handleFormView.js';

let displayErrors = false;

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submitButton');
  const getStarted = document.getElementById('get-started');
  const name = document.getElementById('name');
  const weight = document.getElementById('weight');
  const heightFeet = document.getElementById('feet');
  const heightInches = document.getElementById('inches');
  const diet = document.getElementById('diet');

  // handle form validation, grid display & form hiding
  submitButton.addEventListener('click', (event) => {
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
      if (!displayErrors) {
        populateValidationErrors({
          errors: result.errors,
          fields: ['name', 'weight', 'diet', 'inches', 'feet'],
        });
        displayErrors = true;
      }
    } else {
      form.hide();
      // renderTilesGrid();
    }
  });

  // handle create new infographic (renders the form page)
  getStarted.addEventListener('click', (event) => {
    event.preventDefault();

    form.show();
  });
});
