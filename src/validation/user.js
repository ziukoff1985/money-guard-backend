import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(33).trim().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
  }),
  password: Joi.any().forbidden().messages({
    'any.unknown': 'Password update is not allowed',
    'any.forbidden': 'Password update is not allowed',
  }),
  email: Joi.any().forbidden().messages({
    'any.unknown': 'Email update is not allowed',
    'any.forbidden': 'Email update is not allowed',
  }),
  balance: Joi.any().forbidden().messages({
    'any.unknown': 'Balance update is not allowed',
    'any.forbidden': 'Balance update is not allowed',
  }),
}).or('name'); // at least one field must be provided
