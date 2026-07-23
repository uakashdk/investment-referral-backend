import Joi from "joi";

/**
 * Register Validation
 */
export const registerSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .messages({
      "string.empty": "Full name is required.",
      "string.min": "Full name must be at least 3 characters.",
      "string.max": "Full name cannot exceed 100 characters.",
      "string.pattern.base":
        "Full name can contain only letters and single spaces between words.",
      "any.required": "Full name is required.",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),

  mobile: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required.",
      "string.pattern.base":
        "Mobile number must be exactly 10 digits and start with 6-9.",
      "any.required": "Mobile number is required.",
    }),

  password: Joi.string()
    .trim()
    .min(6)
    .max(20)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{6,20}$/
    )
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min":
        "Password must contain at least 6 characters.",
      "string.max":
        "Password cannot exceed 20 characters.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.required": "Password is required.",
    }),

  referredBy: Joi.string()
    .trim()
    .length(8)
    .uppercase()
    .pattern(/^[A-Z0-9]{8}$/)
    .optional()
    .messages({
      "string.length":
        "Referral code must be exactly 8 characters.",
      "string.pattern.base":
        "Referral code must contain only uppercase letters and numbers.",
    }),
});

/**
 * Login Validation
 */
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
});