import Joi from "joi";

const insertToCartValidationSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
});

export { insertToCartValidationSchema };
