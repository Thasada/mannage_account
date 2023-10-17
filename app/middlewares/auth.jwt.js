const jwt = require("jsonwebtoken");
const secretKey = require("../config/jwt.config");
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "No token provided" });
  jwt.verify(token, secretKey.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized" });
    req.id = decoded.id;
    next();
  });
};

module.exports = verifyToken;
