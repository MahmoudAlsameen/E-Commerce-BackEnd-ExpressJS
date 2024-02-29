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

adminRoutes.get("/allAdmin", getAllAdmins);

adminRoutes.post("/register", adminRegister);
adminRoutes.post("/login", adminLogin);
adminRoutes.patch("/:id", adminUpdate);
adminRoutes.delete("/:id", [adminDelete]);
adminRoutes.patch("/password/:id", adminChangePassword);

export default adminRoutes;
