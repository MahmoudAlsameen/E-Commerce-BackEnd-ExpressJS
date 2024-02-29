import productModel from "./../db/models/product.model.js";
import catchAsync from "./../utils/catchAsync.js";

const addProduct = catchAsync(async (req, res, next) => {
  const addedProduct = await productModel.create({ ...req.body });
  res.status(201).json({ message: "Product added successfully", addedProduct });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const allProducts = await productModel.find();
  res.status(201).json({ message: "Products found", allProducts });
});

const getProductsPagination = catchAsync(async (req, res, next) => {});

const getOneProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const foundedProduct = await productModel.findById(productId);
  if (foundedProduct) {
    res.status(201).json({ message: "Product found", foundedProduct });
  } else {
    next(new AppError("Product not found", 404));
  }
});

const updateProduct = catchAsync(async (req, res, next) => {});

export {
  addProduct,
  getAllProducts,
  getOneProduct,
  getProductsPagination,
  updateProduct,
};
