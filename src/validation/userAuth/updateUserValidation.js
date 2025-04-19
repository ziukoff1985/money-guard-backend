import Joi from 'joi';

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(32).trim().messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username cannot be longer than 32 characters',
  }),
  email: Joi.string().email().max(64).trim().messages({
    'string.email': 'Please provide a valid email address',
    'string.max': 'Email cannot be longer than 64 characters',
  }),
  balance: Joi.number().min(0).messages({
    'number.base': 'Balance must be a number',
    'number.min': 'Balance cannot be negative',
  }),
  avatar: Joi.string().default('').messages({
    'string.base': 'Avatar must be a string',
  }),
}).min(1);
