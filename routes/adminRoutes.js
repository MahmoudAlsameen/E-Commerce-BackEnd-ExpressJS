import express from "express";
import {
  adminChangePassword,
  adminDelete,
  adminLogin,
  adminRegister,
  adminUpdate,
  getAllAdmins,
} from "../controllers/admin.controller.js";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
import {
  adminChangePasswordValidationSchema,
  adminDeleteValidationSchema,
  adminLoginValidationSchema,
  adminRegisterValidationSchema,
  adminUpdateValidationSchema,
} from "../validation/admin.validation.js";
const adminRoutes = express.Router();

adminRoutes.get("/allAdmins", getAllAdmins);

adminRoutes.post(
  "/register",
  validation(adminRegisterValidationSchema),
  adminRegister
);
adminRoutes.post("/login", validation(adminLoginValidationSchema), adminLogin);
adminRoutes.patch(
  "/:id",
  [auth, validation(adminUpdateValidationSchema)],
  adminUpdate
);
adminRoutes.delete(
  "/:id",
  [auth, validation(adminDeleteValidationSchema)],
  adminDelete
);
adminRoutes.patch(
  "/password/:id",
  [auth, validation(adminChangePasswordValidationSchema)],
  adminChangePassword
);

export default adminRoutes;
