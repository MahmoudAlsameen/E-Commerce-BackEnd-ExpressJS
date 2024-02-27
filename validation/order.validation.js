import Joi from "joi";

const orderValidationSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(), // Use 'product' instead of 'productId' to match Mongoose schema
        quantity: Joi.number().integer().min(1).required(), // Add .integer() constraint to ensure the quantity is an integer
      })
    )
    .required(),
  status: Joi.string()
    .valid(
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Canceled",
      "Refunded",
      "On Hold",
      "Completed",
      "Failed"
    )
    .default("Pending"), // Include validation for the status field
});

export default orderValidationSchema;
