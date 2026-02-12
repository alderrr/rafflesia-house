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

  if (err.message === "Room is not available") {
    status = 400;
    message = "Room is not available";
  }

  if (err.message === "Invalid payment type") {
    status = 400;
    message = "Invalid payment type";
  }

  if (err.message === "Tenant already checked out") {
    status = 400;
    message = "Tenant already checked out";
  }

  if (err.message === "Invalid payment type") {
    status = 400;
    message = "Invalid payment type";
  }

  if (err.message === "Amount must be greater than 0") {
    status = 400;
    message = "Amount must be greater than 0";
  }

  if (err.message === "Room has active tenant") {
    status = 400;
    message = "Room has active tenant";
  }

  if (err.message === "Guest has active tenant") {
    status = 400;
    message = "Guest has active tenant";
  }

  if (err.message === "Cannot delete active tenant") {
    status = 400;
    message = "Cannot delete active tenant";
  }

  if (err.message === "Tenant has payment history") {
    status = 400;
    message = "Tenant has payment history";
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

  if (err.message === "Tenant not found") {
    status = 404;
    message = "Tenant not found";
  }

  if (err.message === "Tenant not found") {
    status = 404;
    message = "Tenant not found";
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
