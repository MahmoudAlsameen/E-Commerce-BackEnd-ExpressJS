import AppError from "../utils/appError.js";

const validation = (schema, source) => {
  return (req, res, next) => {
    let { error } = schema.validate(req[source] || req.body);
    if (error) {
      next(new AppError(error.message, 400));
    } else {
      next();
    }
  };
};

export default validation;
