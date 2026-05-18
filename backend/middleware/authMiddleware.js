const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;