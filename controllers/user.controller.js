import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

const userUpdate = async (req, res) => {
  try {
    const userId = req.userId;
    let user = await userModel.findById(userId);
    if (user) {
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        { ...req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const userChangePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (user) {
      const oldPassword = req.body.oldPassword;
      const isMatched = bcrypt.compareSync(req.body.oldPassword, user.password);
      if (isMatched) {
        const newHashedPassword = bcrypt.hashSync(
          req.body.newPassword,
          saltRounds
        );
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
          password: newHashedPassword,
        });
        res.status(200).json({ message: "Password updated successfully" });
      } else {
        res.status(401).json({ message: "Invalid oldPassword" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const userDelete = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (user) {
      const isMatched = bcrypt.compareSync(req.body.password, user.password);
      if (isMatched) {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
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
