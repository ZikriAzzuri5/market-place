const router = require("express").Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const productController = require("./controller");

router.get("/products", productController.index);

router.post("/products", authMiddleware, productController.create);

router.put("/products/:id", authMiddleware, productController.update);

router.delete("/products/:id", authMiddleware, productController.destroy);

module.exports = router;
