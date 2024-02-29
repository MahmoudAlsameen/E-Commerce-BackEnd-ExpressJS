import cors from "cors";
import express from "express";
import morgan from "morgan";

import connection from "./db/connection.js";
import globalErrorHandler from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { createDefaultAdmin } from "./services/adminService.js";
import AppError from "./utils/appError.js";
import { load_env } from "./utils/load.env.js";

load_env();
const app = express();

app.use(cors());
app.use(express.json());

// Morgan logging
if (process.env.MORGAN_LOGGING) {
  app.use(morgan(process.env.MORGAN_LOGGING));
  console.log(`Morgan_Logging mode: ${process.env.MORGAN_LOGGING}`);
}

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

connection();
createDefaultAdmin();
export default app;
