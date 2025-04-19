import Joi from 'joi';

export const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(32).required().trim().messages({
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username cannot be longer than 32 characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().max(64).required().trim().messages({
    'string.email': 'Please provide a valid email address',
    'string.max': 'Email cannot be longer than 64 characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password cannot be longer than 64 characters',
    'any.required': 'Password is required',
  }),
  balance: Joi.number().min(0).default(0).messages({
    'number.base': 'Balance must be a number',
    'number.min': 'Balance cannot be negative',
  }),
  avatar: Joi.string().default('').messages({
    'string.base': 'Avatar must be a string',
  }),
});
