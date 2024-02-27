import express from "express";
import Joi from "joi";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
const productRoutes = express.Router();

productRoutes.post("/", validation(Joi.object(), "body"), () => {});

productRoutes.get("/", auth, () => {});

export default productRoutes;
