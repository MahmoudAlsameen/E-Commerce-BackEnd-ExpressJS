import express from "express";
import { addMessage, getMessages } from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
import messageValidationSchema from "../validation/message.validation.js";
const messageRoutes = express.Router();

messageRoutes.post(
  "/",
  validation(messageValidationSchema, "body"),
  addMessage
);

messageRoutes.get("/", auth, getMessages);

export default messageRoutes;
