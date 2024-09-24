const jwt = require("jsonwebtoken");
const config = require("../app/config");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

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
