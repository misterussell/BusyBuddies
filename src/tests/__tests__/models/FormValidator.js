import FormValidator from '../../../models/FormValidator';

describe('the FormValidator class', () => {

  it('should construct with an array of validation rules', () => {
    const rule1 = 'rule 1';
    const rule2 = 'rule 2';
    const rule3 = 'rule 3';
    const validator = new FormValidator([rule1, rule2, rule3]);
    expect(validator.validations).toEqual([rule1, rule2, rule3]);
    expect(() => {
      const badArgsValidator = new FormValidator(null);
    }).toThrow();
    expect(() => {
      const correctArgsValidator = new FormValidator([rule1, rule2, rule3]);
    }).not.toThrow();
  });
});
