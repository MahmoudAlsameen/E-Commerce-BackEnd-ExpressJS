import express from "express";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
const orderRoutes = express.Router();

orderRoutes.post("/", validation(Joi.object(), "body"), () => {});

orderRoutes.get("/", auth, () => {});

export default orderRoutes;
