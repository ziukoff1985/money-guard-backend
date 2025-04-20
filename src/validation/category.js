import Joi from 'joi';

export const categorySchema = Joi.object({
  title: Joi.string()
    .valid(
      'Incomes',
      'Main expenses',
      'Products',
      'Car',
      'Self care',
      'Child care',
      'Household products',
      'Education',
      'Leisure',
      'Other expenses',
      'Entertainment',
    )
    .required(),
});
