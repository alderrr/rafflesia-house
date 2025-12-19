const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  console.log(err);

  if (err.message === "Username and password are required") {
    status = 400;
    message = "Username and password are required";
  }

  if (err.message === "Username already exists") {
    status = 400;
    message = "Username already exists";
  }

  if (err.message === "Invalid username or password") {
    status = 401;
    message = "Invalid username or password";
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
