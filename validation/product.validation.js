import Joi from "joi";

const addProductValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  image: Joi.array().items(Joi.string()).optional(), // Assuming image can be an empty string or omitted
  rating: Joi.number().min(0).max(10).optional(), // Assuming rating is optional
});

const updateProductValidationSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(0),
  category: Joi.string(),
  image: Joi.array().items(Joi.string()).optional(), // Assuming image can be an empty string or omitted
  rating: Joi.number().min(0).max(10).optional(), // Assuming rating is optional
});

export { addProductValidationSchema, updateProductValidationSchema };
