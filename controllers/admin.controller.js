import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../db/models/admin.model.js";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";

const getAllAdmins = catchAsync(async (req, res, next) => {
  const allAdmins = await adminModel.find();
  res.status(201).json({ message: "Admins found", allAdmins });
});

const adminRegister = catchAsync(async (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const addedAdmin = await adminModel.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json({ message: "User added successfully" });
});

const adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const queriedAdmin = await adminModel.findOne({ email });
  if (queriedAdmin) {
    const isMatched = bcrypt.compareSync(password, queriedAdmin.password);
    if (isMatched) {
      const token = jwt.sign(
        { id: queriedAdmin.id },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).json({ message: "Logged in successfully", token });
    } else {
      next(new AppError("Invalid email or password", 401));
    }
  } else {
    next(new AppError("Admin not found", 404));
  }
});

const adminUpdate = catchAsync(async (req, res, next) => {
  const headersAdminId = req.userId;
  const paramAdminId = req.params.id;
  if (headersAdminId != paramAdminId) {
    next(
      new AppError(
        "Admin is not authorized to update the user in the param",
        401
      )
    );
  } else {
    let user = await adminModel.findById(headersAdminId);
    if (user) {
      const updatedAdmin = await adminModel.findByIdAndUpdate(
        headersAdminId,
        { ...req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Admin updated successfully", updatedAdmin });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  }
});

const adminChangePassword = catchAsync(async (req, res, next) => {
  const headersAdminId = req.userId;
  const paramAdminId = req.params.id;
  if (headersAdminId != paramAdminId) {
    next(
      new AppError(
        "Admin is not authorized to update the user in the param",
        401
      )
    );
  } else {
    const admin = await adminModel.findById(headersAdminId);
    if (admin) {
      const oldPassword = req.body.oldPassword;
      const isMatched = bcrypt.compareSync(oldPassword, admin.password);
      if (isMatched) {
        const newHashedPassword = bcrypt.hashSync(
          req.body.newPassword,
          parseInt(process.env.SALT_ROUNDS)
        );
        const updatedAdmin = await adminModel.findByIdAndUpdate(
          headersAdminId,
          {
            password: newHashedPassword,
          }
        );
        res.status(200).json({ message: "Password updated successfully" });
      } else {
        res.status(401).json({ message: "Invalid oldPassword" });
      }
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  }
});

const adminDelete = async (req, res) => {
  const headersAdminId = req.userId;
  const paramAdminId = req.params.id;
  if (headersAdminId != paramAdminId) {
    next(
      new AppError(
        "Admin is not authorized to delete the user in the param",
        401
      )
    );
  } else {
    const admin = await adminModel.findById(headersAdminId);
    if (admin) {
      const isMatched = bcrypt.compareSync(req.body.password, admin.password);
      if (isMatched) {
        const deletedAdmin = await adminModel.findByIdAndDelete(headersAdminId);
        res.status(200).json({ message: "Admin deleted successfully" });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  }
};

export {
  adminChangePassword,
  adminDelete,
  adminLogin,
  adminRegister,
  adminUpdate,
  getAllAdmins,
};
