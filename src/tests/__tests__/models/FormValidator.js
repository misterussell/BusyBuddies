import validator from 'validator';
/*
  validator is a library of string validators and sanitizers
*/

import FormValidator from '../../../models/FormValidator';

describe('the FormValidator class', () => {

  it('should construct with an array of validation rules', () => {
    const rule1 = 'rule 1';
    const rule2 = 'rule 2';
    const rule3 = 'rule 3';
    const formValidator = new FormValidator([rule1, rule2, rule3]);
    expect(formValidator.validations).toEqual([rule1, rule2, rule3]);
    expect(() => {
      const badArgsValidator = new FormValidator(null);
    }).toThrow();
    expect(() => {
      const badArgsValidator = new FormValidator('foo, bar');
    }).toThrow();
    expect(() => {
      const correctArgsValidator = new FormValidator([rule1, rule2, rule3]);
    }).not.toThrow();
  });

  it('should have a validate method that returns an object', () => {
    const rule = {
      field: 'email',
      method: validator.isEmpty,
      validWhen: false,
      message: 'Please provide an email address.',
    };
    const state = { email: 'test@test.com' };
    const formValidator = new FormValidator([rule]);
    expect(formValidator.validate(state)).toEqual({
      'email': {
        isInvalid: false,
        message: '',
      },
      isValid: true,
    });
  });

  it('should validate that an email field is not empty', () => {
    const formValidator = new FormValidator([
      {
        field: 'email',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Please provide an email address.'
      }
    ]);
  })
});
