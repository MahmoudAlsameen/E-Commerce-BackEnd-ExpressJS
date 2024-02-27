import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
