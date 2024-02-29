import Joi from "joi";

const userRegisterValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/)
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      "string.empty": "Password is required",
    }),
  fullName: Joi.string().min(3).optional(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  cart: Joi.string().allow(null).optional(), // Assuming cart can be null or omitted
  orders: Joi.array().items(Joi.string()).optional(), // Assuming orders is an array of strings
});

const userLoginValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/)
    .required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      "string.empty": "Password is required",
    }),
});

const userUpdateValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/),
  fullName: Joi.string().min(3).optional(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  cart: Joi.string().allow(null).optional(), // Assuming cart can be null or omitted
  orders: Joi.array().items(Joi.string()).optional(), // Assuming orders is an array of strings
});

// User Change Password validation schema
const userChangePasswordValidationSchema = Joi.object({
  oldPassword: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Old password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      "string.empty": "Password is required",
    }),
  newPassword: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "New Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      "string.empty": "Password is required",
    }),
});

// User Delete validation schema
const userDeleteValidationSchema = Joi.object({
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      "string.empty": "Password is required",
    }),
});
export {
  userChangePasswordValidationSchema,
  userDeleteValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
  userUpdateValidationSchema,
};
