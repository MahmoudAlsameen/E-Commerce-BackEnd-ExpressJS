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
        "Admin is not authorized to update the admin in the param",
        401
      )
    );
  } else {
    let admin = await adminModel.findById(headersAdminId);
    if (admin) {
      const updatedAdmin = await adminModel.findByIdAndUpdate(
        headersAdminId,
        { ...req.body },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Admin updated successfully", updatedAdmin });
    } else {
      next(new AppError("Admin not found", 404));
    }
  }
});

const adminChangePassword = catchAsync(async (req, res, next) => {
  const headersAdminId = req.userId;
  const paramAdminId = req.params.id;
  if (headersAdminId != paramAdminId) {
    next(
      new AppError(
        "Admin is not authorized to update the admin in the param",
        401
      )
    );
  } else {
    const admin = await adminModel.findById(headersAdminId);
    if (admin) {
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const isMatched = bcrypt.compareSync(oldPassword, admin.password);
      if (isMatched) {
        if (oldPassword === newPassword) {
          next(new AppError("oldPassword is the same as newPassword", 400));
        } else {
          const newHashedPassword = bcrypt.hashSync(
            newPassword,
            parseInt(process.env.SALT_ROUNDS)
          );
          const updatedAdmin = await adminModel.findByIdAndUpdate(
            headersAdminId,
            {
              password: newHashedPassword,
            }
          );
          res.status(200).json({ message: "Password updated successfully" });
        }
      } else {
        next(new AppError("Invalid oldPassword", 401));
      }
    } else {
      next(new AppError("Admin not found", 404));
    }
  }
});

const adminDelete = async (req, res) => {
  const headersAdminId = req.userId;
  const paramAdminId = req.params.id;
  if (headersAdminId != paramAdminId) {
    next(
      new AppError(
        "Admin is not authorized to delete the admin in the param",
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
        next(new AppError("Invalid password", 401));
      }
    } else {
      next(new AppError("Admin not found", 404));
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
