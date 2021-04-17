const DEFAULT_ERROR_MESSAGE = Object.freeze('This field is required');
const REQUIRED_FORM_FIELDS = Object.freeze(['name', 'weight', 'height', 'diet']);

function mergeArrayObjects(array) {
  return array.reduce((obj, current) => Object.assign(obj, current), {});
}

function validateName(name) {
  if (name && name.length > 4) {
    return { isValid: true };
  }

  return {
    isValid: false,
    message: 'must contain at least 4 characters',
  };
}

function validateWeight(weight) {
  if (weight && weight > 0) {
    return { isValid: true };
  }

  return { isValid: false, message: 'must be greater than zero' };
}

function validateDiet(diet) {
  const hasDiet = ['herbivore', 'omnivore', 'carnivore'].includes(diet.toLowerCase());
  if (diet && hasDiet) {
    return { isValid: true };
  }

  return {
    isValid: false,
    message: 'should include either "herbivore", "omnivore" or "carnivore"',
  };
}

function validateHeight(height) {
  const errors = [];
  let isValid = true;

  ['feet', 'inches'].forEach((field) => {
    if (!Object.hasOwnProperty.call(height, field)) {
      errors.push({ [field]: DEFAULT_ERROR_MESSAGE });
      isValid = false;
    } else {
      const value = Number(height[field]);
      if (value < 1) {
        errors.push({ [field]: 'must be greater than zero' });
        isValid = false;
      }
    }
  });

  return {
    isValid,
    errors,
  };
}

function validateFields(data) {
  const formData = [];
  const errors = [];

  REQUIRED_FORM_FIELDS.forEach((field) => {
    if (!Object.hasOwnProperty.call(data, field)) {
      errors.push({ [field]: DEFAULT_ERROR_MESSAGE });
    } else {
      if (field === 'name') {
        const nameValidationResult = validateName(data[field]);
        if (nameValidationResult.isValid) {
          formData.push({ [field]: data[field] });
        } else {
          errors.push({ [field]: nameValidationResult.message });
        }
      }

      if (field === 'diet') {
        const dietValidationResult = validateDiet(data[field]);
        if (dietValidationResult.isValid) {
          formData.push({ [field]: data[field] });
        } else {
          errors.push({ [field]: dietValidationResult.message });
        }
      }

      if (field === 'height') {
        const { isValid, errors: heightErrors } = validateHeight(data[field]);
        if (isValid) {
          formData.push({ feet: data[field].feet });
          formData.push({ inches: data[field].inches });
        } else {
          heightErrors.forEach((heightError) => errors.push(heightError));
        }
      }

      if (field === 'weight') {
        const weightValidationResult = validateWeight(data[field]);
        if (weightValidationResult.isValid) {
          formData.push({ [field]: data[field] });
        } else {
          errors.push({ [field]: weightValidationResult.message });
        }
      }
    }
  });

  return {
    errors,
    formData,
  };
}

function validateForm(data) {
  if (data) {
    const result = {};

    const { errors, formData } = validateFields(data);

    Object.assign(result, {
      formData: mergeArrayObjects(formData),
      errors: mergeArrayObjects(errors),
    });

    return result;
  }

  // no data is provided
  const errorObj = REQUIRED_FORM_FIELDS.reduce((result, field) => {
    if (field === 'height') {
      Object.assign(result, { errors: { feet: DEFAULT_ERROR_MESSAGE, inches: DEFAULT_ERROR_MESSAGE } });
    } else {
      Object.assign(result, { errors: { [field]: DEFAULT_ERROR_MESSAGE } });
    }

    return result;
  }, {});

  return errorObj;
}

export default validateForm;
