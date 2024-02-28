import AppError from "./appError.js";

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      if (error.code === 11000 && error.keyValue) {
        let message = "";
        for (const key in error.keyValue) {
          message += `${key}: ${error.keyValue[key]} Already exists. `;
        }
        return next(new AppError(message.trim(), 400));
      }
      next(error);
    });
  };
};
export default catchAsync;
