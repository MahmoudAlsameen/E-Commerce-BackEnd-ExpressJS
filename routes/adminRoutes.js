import express from "express";
import {
  adminChangePassword,
  adminDelete,
  adminLogin,
  adminRegister,
  adminUpdate,
  getAllAdmins,
} from "../controllers/admin.controller.js";
const adminRoutes = express.Router();

userRoutes.get("/allAdmin", getAllAdmins);

userRoutes.post("/register", adminRegister);
userRoutes.post("/login", adminLogin);
userRoutes.patch("/:id", adminUpdate);
userRoutes.delete("/:id", [adminDelete]);
userRoutes.patch("/password/:id", adminChangePassword);

export default adminRoutes;
