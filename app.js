import cors from "cors";
import express from "express";
import morgan from "morgan";

import globalErrorHandler from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
import { load_env } from "./utils/load.env.js";

load_env();
const envMorganLogging = process.env.MORGAN_LOGGING;
const app = express();

app.use(cors());
app.use(express.json());

// Morgan logging
if (envMorganLogging) {
  app.use(morgan(envMorganLogging));
  console.log(`Morgan_Logging mode: ${envMorganLogging}`);
}

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);
export default app;
