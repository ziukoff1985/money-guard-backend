import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createTransactionSchema = Joi.object({
  transactionType: Joi.string()
    .valid('income', 'expense')
    .required()
    .default('expense'),

  categoryId: Joi.string()
    .custom((value, helper) => {
      if (!isValidObjectId(value)) {
        return helper.message('Category ID should be a valid Mongo ID');
      }
      return value;
    })
    .required(),

  summ: Joi.number().positive().required(),

  date: Joi.date().default(() => new Date()),

  comment: Joi.string().max(300).optional(),

  userId: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message('User ID should be a valid Mongo ID');
    }
    return value;
  }),
});

export const updateTransactionSchema = Joi.object({
  transactionType: Joi.string().valid('income', 'expense'),

  categoryId: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message('Category ID should be a valid Mongo ID');
    }
    return value;
  }),

  summ: Joi.number().positive(),

  date: Joi.date(),

  comment: Joi.string().max(300),
});
