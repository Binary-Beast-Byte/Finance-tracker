module.exports.isUserAuthenticated = (req, res, next) => {
    if (req.user) {
      next(); // user is authenticated, continue with the next middleware
    } else {
      res.status(401).json({ error: "You must be logged in to access this resource" });
    }
  }