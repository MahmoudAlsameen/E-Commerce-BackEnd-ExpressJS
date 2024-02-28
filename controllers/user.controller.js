import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cartModel from "../db/models/cart.model.js";
import userModel from "../db/models/user.model.js";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";

const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await userModel.find();
  res.status(201).json({ message: "Users founded", allUsers });
});

const userRegister = catchAsync(async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const addedUser = await userModel.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json({ message: "User added successfully" });
});

const userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const queriedUser = await userModel.findOne({ email });
  if (queriedUser) {
    const isMatched = bcrypt.compareSync(password, queriedUser.password);
    if (isMatched) {
      const token = jwt.sign(
        { id: queriedUser.id },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).json({ message: "Logged in successfully", token });
    } else {
      next(new AppError("Invalid email or password", 401));
    }
  } else {
    next(new AppError("User not found", 404));
  }
});

const userUpdate = catchAsync(async (req, res, next) => {
  const headersUserId = req.userId;
  const paramUserId = req.params.id;
  if (headersUserId != paramUserId) {
    next(
      new AppError(
        "User is not authorized to update the user in the param",
        401
      )
    );
  } else {
    let user = await userModel.findById(headersUserId);
    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        headersUserId,
        { ...req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

const userChangePassword = catchAsync(async (req, res, next) => {
  const headersUserId = req.userId;
  const paramUserId = req.params.id;
  if (headersUserId != paramUserId) {
    next(
      new AppError(
        "User is not authorized to update the user in the param",
        401
      )
    );
  } else {
    const user = await userModel.findById(headersUserId);
    if (user) {
      const oldPassword = req.body.oldPassword;
      const isMatched = bcrypt.compareSync(oldPassword, user.password);
      if (isMatched) {
        const newHashedPassword = bcrypt.hashSync(
          req.body.newPassword,
          parseInt(process.env.SALT_ROUNDS)
        );
        const updatedUser = await userModel.findByIdAndUpdate(headersUserId, {
          password: newHashedPassword,
        });
        res.status(200).json({ message: "Password updated successfully" });
      } else {
        res.status(401).json({ message: "Invalid oldPassword" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

const userDelete = async (req, res) => {
  const headersUserId = req.userId;
  const paramUserId = req.params.id;
  if (headersUserId != paramUserId) {
    next(
      new AppError(
        "User is not authorized to delete the user in the param",
        401
      )
    );
  } else {
    const user = await userModel.findById(headersUserId);
    if (user) {
      const isMatched = bcrypt.compareSync(req.body.password, user.password);
      if (isMatched) {
        const deletedUser = await userModel.findByIdAndDelete(headersUserId);
        const deletedCart = await cartModel.findOne({ userId: headersUserId });
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
};

export {
  getAllUsers,
  userChangePassword,
  userDelete,
  userLogin,
  userRegister,
  userUpdate,
};
