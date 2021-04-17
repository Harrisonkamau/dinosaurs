/**
 * Handles display or hiding of form based on its validation
 */
const handleForm = (function () {
  /**
   * Hides the form
   * - sets the class form to display 'none'
   */
  function hideForm() {
    const form = document.getElementById('user-form');

    form.classList.add('hideForm');
    form.classList.remove('showForm');
  }

  /**
   * Shows the form
   * - sets the class form to display 'block'
   */
  function showForm() {
    const form = document.getElementById('user-form');

    form.classList.add('showForm');
    form.classList.remove('hideForm');
  }

  return {
    show: showForm,
    hide: hideForm,
  };
}());

export default handleForm;
