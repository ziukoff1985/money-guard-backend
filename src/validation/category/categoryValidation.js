import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string()
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
    .required()
    .messages({
      'any.only': 'Invalid category name',
      'any.required': 'Category name is required',
    }),
  type: Joi.string().valid('income', 'expense').required().messages({
    'any.only': 'Type must be either "income" or "expense"',
    'any.required': 'Type is required',
  }),
});
