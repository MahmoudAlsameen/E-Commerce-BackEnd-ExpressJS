import express from "express";
import {
  addProduct,
  getAllProducts,
  getOneProduct,
  getProductsPagination,
  updateProduct,
} from "../controllers/product.controller.js";
import auth from "../middleware/auth.js";
import validation from "../middleware/validation.js";
import {
  addProductValidationSchema,
  updateProductValidationSchema,
} from "../validation/product.validation.js";
const productRoutes = express.Router();

productRoutes.post(
  "/",
  [auth, validation(addProductValidationSchema, "body")],
  addProduct
);

productRoutes.get("/", getAllProducts);

productRoutes.get("/:page", getProductsPagination);

productRoutes.get("/:id", getOneProduct);

productRoutes.patch(
  "/:id",
  validation(updateProductValidationSchema, "body"),
  updateProduct
);

export default productRoutes;
