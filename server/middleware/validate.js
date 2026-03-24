const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    // return res.status(400).json({
    //   message: "Validation error",
    //   errors: err.errors,
    // });
    next({
      statusCode: 400,
      message: err.errors[0].message,
    });
  }
};

module.exports = validate;
