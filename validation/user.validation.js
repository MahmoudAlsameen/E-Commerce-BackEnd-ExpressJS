import Joi from "joi";

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
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
  cart: Joi.string().allow(null).optional(), // Assuming cart can be null or omitted
  orders: Joi.array().items(Joi.string()).optional(), // Assuming orders is an array of strings
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
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
  cart: Joi.string().allow(null).optional(), // Assuming cart can be null or omitted
  orders: Joi.array().items(Joi.string()).optional(), // Assuming orders is an array of strings
});
export { userLoginSchema, userRegisterSchema };
