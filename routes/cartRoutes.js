import express from "express";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
const cartRoutes = express.Router();

cartRoutes.post("/", validation(Joi.object(), "body"), () => {});

cartRoutes.get("/", auth, () => {});

export default cartRoutes;
