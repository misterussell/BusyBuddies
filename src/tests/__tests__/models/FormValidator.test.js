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
  });

  it('should throw an error if invalid args are passed in during construction', () => {
    expect(() => {
      const badArgsValidator = new FormValidator(null);
      return badArgsValidator;
    }).toThrow();
    expect(() => {
      const badArgsValidator = new FormValidator('foo, bar');
      return badArgsValidator
    }).toThrow();
    expect(() => {
      const correctArgsValidator = new FormValidator([1, 2, 3]);
      return correctArgsValidator;
    }).not.toThrow();
  })

  it('should have a validate method that returns an object #validation', () => {
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

  it('should validate that an email field is not empty #validation', () => {
    const formValidator = new FormValidator([
      {
        field: 'email',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Please provide an email address.',
      }
    ]);

    const negativeTest = { email: '' };
    expect(formValidator.validate(negativeTest)).toEqual({
      email: {
        isInvalid: true,
        message: 'Please provide an email address.'
      },
      isValid: false,
    });

    const positiveTest = { email: 'foo@bar.com' };
    expect(formValidator.validate(positiveTest)).toEqual({
      email: {
        isInvalid: false,
        message: '',
      },
      isValid: true,
    });
  });

  it('should validate that an email field has a valid email #validation', () => {
    const formValidator = new FormValidator([
      {
        field: 'email',
        method: validator.isEmail,
        validWhen: true,
        message: 'Please enter a valid email address.',
      }
    ]);

    const negativeTest = { email: 'fooBar' };
    expect(formValidator.validate(negativeTest)).toEqual({
      email: {
        isInvalid: true,
        message: 'Please enter a valid email address.',
      },
      isValid: false,
    });

    const positiveTest = { email: 'foo@bar.com' };
    expect(formValidator.validate(positiveTest)).toEqual({
      email: {
        isInvalid: false,
        message: '',
      },
      isValid: true,
    });
  });

  it('should validate that two password fields match #validation', () => {
    const password1 = 'P@ssword';
    const password2 = 'P@ssword';
    const negativePassword = 'FooBar';

    const formValidator = new FormValidator(['foo']);

    expect(formValidator.matchPasswords(password1, password2)).toEqual({
      password: {
        isInvalid: false,
        message: '',
      },
      isValid: true,
    });
    expect(formValidator.matchPasswords(password1, negativePassword)).toEqual({
      password: {
        isInvalid: true,
        message: 'Passwords do not match.',
      },
      isValid: false,
    });
  });

  it('should list validity for multiple fields in the same validation object #validation', () => {
    const email = 'foo@bar.com';
    const password  = 'P@ssword';

    const formValidator = new FormValidator([
      {
        field: 'email',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Please provide an email address.',
      },
      {
        field: 'email',
        method: validator.isEmail,
        validWhen: true,
        message: 'Please enter a valid email address.',
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Please enter a password.',
      },
    ]);
    const positiveFormState = { email, password };
    const positiveValidation = formValidator.validate(positiveFormState);
    const negativeFormState = { email: 'foo', password: '' };
    const negativeValidation = formValidator.validate(negativeFormState);

    expect(positiveValidation.isValid).toBe(true);
    expect(negativeValidation).toEqual({
      email: {
        isInvalid: true,
        message: 'Please enter a valid email address.',
      },
      isValid: false,
      password: {
        isInvalid: true,
        message: 'Please enter a password.',
      },
    });
    expect(negativeValidation.email).toEqual({
      isInvalid: true,
      message: 'Please enter a valid email address.',
    });
    expect(negativeValidation.password).toEqual({
      isInvalid: true,
      message: 'Please enter a password.',
    });
  });

  it('should sanitize email addresses #sanity #validation', () => {
    const email = 'FooBar@LIVE.com';
    const gmail = 'FOOBAR@gmail.com';

    const formValidator = new FormValidator(['rule 1', 'rule 2']);

    expect(formValidator.sanitizeEmail(email)).toEqual('foobar@live.com');
    expect(formValidator.sanitizeEmail(gmail)).toEqual('foobar@gmail.com');
  });
});
