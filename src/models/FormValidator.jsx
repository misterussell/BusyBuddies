export default class FormValidator {
  constructor(validations) {
    // validations: an array of form specific validation rules
    if (Array.isArray(validations)) {
      this.validations = validations;
    } else throw new Error('FormValidator can only be constructed with an array of validation rules.')
  }

  validate(state) {
    const validation = {};
    // iterate through the validation rules and construct a validation object
    // return the the validation object
    return validation;
  }

  getValidations() {
    return this.validations;
  }
}
