const router = require("express").Router();

const orderController = require("./controller");

router.get("/orders", orderController.index);

router.post("/orders", orderController.create);

router.put("/orders/:id", orderController.update);

router.delete("/orders/:id", orderController.destroy);

module.exports = router;
