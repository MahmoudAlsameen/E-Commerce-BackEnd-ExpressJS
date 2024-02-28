import express from "express";
import {
  getAllUsers,
  userChangePassword,
  userDelete,
  userLogin,
  userRegister,
  userUpdate,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import {
  userChangePasswordValidationSchema,
  userDeleteValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
  userUpdateValidationSchema,
} from "../validation/user.validation.js";
import validation from "./../middleware/validation.js";
const userRoutes = express.Router();

userRoutes.get("/allUsers", getAllUsers);

userRoutes.post(
  "/register",
  validation(userRegisterValidationSchema),
  userRegister
);
userRoutes.post("/login", validation(userLoginValidationSchema), userLogin);
userRoutes.patch(
  "/:id",
  [auth, validation(userUpdateValidationSchema)],
  userUpdate
);
userRoutes.delete("/:id", [
  auth,
  validation(userDeleteValidationSchema),
  userDelete,
]);
userRoutes.patch(
  "/password/:id",
  [auth, validation(userChangePasswordValidationSchema)],
  userChangePassword
);

export default userRoutes;
