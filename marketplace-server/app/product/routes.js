const router = require("express").Router();

const productController = require("./controller");

router.get("/products", productController.index);

router.post("/products", productController.create);

router.put("/products/:id", productController.update);

router.delete("/products/:id", productController.destroy);

module.exports = router;
