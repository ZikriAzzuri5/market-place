const jwt = require("jsonwebtoken");
const config = require("../app/config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Failed to authenticate token" });
    }

    req.userId = decoded.id; // Simpan informasi user di request
    next(); // Lanjutkan ke middleware atau rute berikutnya
  });
};

module.exports = authMiddleware;
