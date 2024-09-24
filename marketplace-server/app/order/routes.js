const router = require("express").Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const orderController = require("./controller");

router.get("/orders", orderController.index);

router.post("/orders", authMiddleware, orderController.create);

router.put("/orders/:id", authMiddleware, orderController.update);

router.delete("/orders/:id", authMiddleware, orderController.destroy);

module.exports = router;
