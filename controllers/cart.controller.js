import cartModel from "../db/models/cart.model.js";
import { insertProductArr } from "../services/cartService.js";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";

const insertToCart = catchAsync(async (req, res, next) => {
  const userId = req.userId;

  const queriedCart = await cartModel.findOne({ userId });
  if (queriedCart) {
    const newCartArr = req.body.products;
    insertProductArr(newCartArr, queriedCart.products); // Pass queriedCart.products instead of queriedCart
    await queriedCart.save(); // Save the changes to the cart directly
    res.status(200).json({
      message: "Products added successfully",
      updatedCart: queriedCart,
    }); // Return queriedCart directly
  } else {
    next(new AppError("User not found", 404));
  }
});

const getCart = catchAsync(async (req, res, next) => {
  const userId = req.userId;

  const queriedCart = await cartModel.findOne({ userId });
  if (queriedCart) {
    res.status(200).json({
      message: "Cart was found",
      updatedCart: queriedCart,
    }); // Return queriedCart directly
  } else {
    next(new AppError("User not found", 404));
  }
});

export { getCart, insertToCart };
