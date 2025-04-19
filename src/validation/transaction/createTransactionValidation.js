import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createTransactionSchema = Joi.object({
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
    .required()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid', { message: 'Invalid category ID' });
      }
      return value;
    })
    .messages({
      'any.invalid': 'Invalid category ID',
      'any.required': 'Category ID is required',
    }),
  amount: Joi.number().min(0).required().messages({
    'number.min': 'Amount cannot be negative',
    'any.required': 'Amount is required',
  }),
  date: Joi.date()
    .iso()
    .default(() => new Date())
    .required()
    .messages({
      'date.format': 'Date must be in ISO format',
      'any.required': 'Date is required',
    }),
  description: Joi.string().max(200).trim().default('').messages({
    'string.max': 'Description cannot be longer than 200 characters',
  }),
  type: Joi.string().valid('income', 'expense').required().messages({
    'string.valid': 'Type must be either "income" or "expense"',
    'any.required': 'Type is required',
  }),
});
