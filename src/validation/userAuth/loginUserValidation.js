import Joi from 'joi';

export const loginUserSchema = Joi.object({
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
});
