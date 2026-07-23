import Joi from "joi";

export const createInvestmentSchema = Joi.object({

  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Investment amount must be a number.",
      "number.positive": "Investment amount must be greater than zero.",
      "any.required": "Investment amount is required."
    }),

  planName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Plan name is required.",
      "string.min": "Plan name must be at least 3 characters.",
      "string.max": "Plan name cannot exceed 100 characters.",
      "any.required": "Plan name is required."
    }),

  durationInDays: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Duration must be a number.",
      "number.integer": "Duration must be an integer.",
      "number.min": "Duration must be at least 1 day.",
      "any.required": "Duration is required."
    }),

  dailyROIPercentage: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": "Daily ROI percentage must be a number.",
      "number.min": "ROI cannot be negative.",
      "number.max": "ROI cannot exceed 100.",
      "any.required": "Daily ROI percentage is required."
    }),

});