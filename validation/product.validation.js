import Joi from "joi";

const productValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  image: Joi.string().allow("").optional(), // Assuming image can be an empty string or omitted
  rating: Joi.number().min(0).max(10).optional(), // Assuming rating is optional
});

export default productValidationSchema;
