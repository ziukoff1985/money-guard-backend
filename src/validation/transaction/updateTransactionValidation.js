import Joi from 'joi';

import { isValidObjectId } from 'mongoose';

export const updateTransactionSchema = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid', { message: 'Invalid user ID' });
      }
      return value;
    })
    .optional()
    .messages({
      'any.invalid': 'Invalid user ID',
    }),
  categoryId: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid', { message: 'Invalid category ID' });
      }
      return value;
    })
    .messages({
      'any.invalid': 'Invalid category ID',
    }),
  amount: Joi.number().min(0).messages({
    'number.min': 'Amount cannot be negative',
  }),
  date: Joi.date().iso().messages({
    'date.format': 'Date must be in ISO format',
  }),
  description: Joi.string().max(200).trim().default('').messages({
    'string.max': 'Description cannot be longer than 200 characters',
  }),
  type: Joi.string().valid('income', 'expense').messages({
    'string.valid': 'Type must be either "income" or "expense"',
  }),
})
  .min(1)
  .messages({
    'any.required': 'At least one field is required for update',
  }); // At least one field must be present for update
