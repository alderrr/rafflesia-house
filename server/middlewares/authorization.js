const authorization = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new Error("Forbidden"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new Error("Forbidden"));
    }

    next();
  };
};

module.exports = authorization;
