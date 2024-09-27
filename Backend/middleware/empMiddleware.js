const jwt = require("jsonwebtoken");
const Employee = require("../models/employeeModel");

const empMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the employee by ID from the decoded token and attach it to the request
      req.employee = await Employee.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Error in auth middleware:", error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token provided" });
  }
};

module.exports = empMiddleware;