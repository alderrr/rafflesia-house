const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  console.log(err);

  // 400 - Bad Request
  if (err.message === "Username and password are required") {
    status = 400;
    message = "Username and password are required";
  }

  if (err.message === "Username already exists") {
    status = 400;
    message = "Username already exists";
  }

  if (err.message === "Guest already exists") {
    status = 400;
    message = "Guest already exists";
  }

  if (err.message === "Room already exists") {
    status = 400;
    message = "Room already exists";
  }

  if (err.message === "Room number is required") {
    status = 400;
    message = "Room number is required";
  }

  if (err.message === "ID Card Number is required") {
    status = 400;
    message = "ID Card Number is required";
  }

  if (err.message === "At least one price is required") {
    status = 400;
    message = "At least one price is required";
  }

  // 401 - Unauthenticated
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

  // 404 - Not Found
  if (err.message === "Admin not found") {
    status = 404;
    message = "Admin not found";
  }

  if (err.message === "Room not found") {
    status = 404;
    message = "Room not found";
  }

  if (err.message === "Guest not found") {
    status = 404;
    message = "Guest not found";
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
