import validator from 'validator';

export default class FormValidator {
  /*
    construct the instance with a set of rules that the form must meet
  */
  constructor(validations) {
    // validations: an array of form specific validation rules
    if (Array.isArray(validations)) {
      this.validations = validations;
    } else throw new Error('FormValidator can only be constructed with an array of validation rules.')
  }

  /*
    iterate through the validation rules and construct a validation object
    return the the validation object:
    {
      email: {
        isInvalid: true,
        message: 'Please provide an email address.'
      },
      isValid: false,
    }
  */
  validate(state) {
    // assume initial state is valid
    const validation = this.isValid();

    // for each validation rule
    this.validations.forEach(rule => {
      // if the field isn't already marked invalid by a previous rule
      if (!validation[rule.field].isInvalid) {
        // find the field value, the method to invoke, and optional args from rule
        const fieldValue = state[rule.field].toString();
        const args = rule.args || [];
        const validationMethod = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

        // call the validation method with the field value, optional args,
        // and complete state. if the validation method doesn't return the same
        // result as the validWhen property, modify the validation object for
        // that field and set isValid to false
        if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
          validation[rule.field] = {
            isInvalid: true,
            message: rule.message,
          };
          validation.isValid = false;
        };
      };
    });
    return validation;
  }

  isValid() {
    const validation = {};
    this.validations.map(rule => {
      validation[rule.field] = { isInvalid: false, message: '' };
      return rule;
    });
    return { isValid: true, ...validation };
  }

  getValidations() {
    return this.validations;
  }

  matchPasswords(password, confirmPassword) {
    if (validator.equals(password, confirmPassword)) {
      return {
        password: {
          isInvalid: false,
          message: '',
        },
        isValid: true,
      };
    } else {
      return {
        password: {
          isInvalid: true,
          message: 'Passwords do not match.',
        },
        isValid: false,
      }
    }
  }

  sanitizeEmail(email) {
    return validator.normalizeEmail(email, [{
      gmail_lowercase: true,
    }]);
  }
}
