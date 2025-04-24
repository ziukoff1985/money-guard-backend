import Joi from 'joi';

export const summaryQuerySchema = Joi.object({
  period: Joi.string()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])$/)
    .required()
    .messages({
      'string.pattern.base': 'Period must be in format YYYY-MM (e.g., 2024-11)',
      'any.required': 'Period is required',
    }),
});
