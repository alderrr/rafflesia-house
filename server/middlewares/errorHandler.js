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

  if (err.message === "Access token required") {
    status = 401;
    message = "Access token required";
  }

  if (err.message === "Invalid access token format") {
    status = 401;
    message = "Invalid access token format";
  }

  if (err.message === "Invalid access token") {
    status = 401;
    message = "Invalid access token";
  }

  if (err.message === "Admin not found") {
    status = 404;
    message = "Admin not found";
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
