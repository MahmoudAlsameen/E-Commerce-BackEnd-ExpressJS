const validation = (schema, source) => {
  return (req, res, next) => {
    let { error } = schema.validate(req[source] || req.body);
    if (error) {
      next(error);
    } else {
      next();
    }
  };
};

export default validation;
