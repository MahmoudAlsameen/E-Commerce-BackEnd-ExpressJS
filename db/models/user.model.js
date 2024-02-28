import mongoose from "mongoose";
import cartModel from "./cart.model.js";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      match: [
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      ],
    },
    fullName: {
      type: String,
      validate: [
        {
          validator: function (v) {
            // Check if the field has been initialized and if it meets the minimum length requirement
            return this.isNew || v.length >= 3;
          },
          message: "Name must be at least 3 characters long",
        },
      ],
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "", // Default to empty string
    },
    address: {
      type: String,
      default: "", // Default to empty string
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.cart) {
    try {
      const newCart = await cartModel.create({ userId: this._id });
      this.cart = newCart._id;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
