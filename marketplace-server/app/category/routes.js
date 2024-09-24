const router = require("express").Router();

const authMiddleware = require("../../middlewares/authMiddleware");
const categoryController = require("./controller");

router.get("/categories", categoryController.index);

router.post("/categories", authMiddleware, categoryController.create);

router.put("/categories/:id", authMiddleware, categoryController.update);

router.delete("/categories/:id", authMiddleware, categoryController.destroy);

module.exports = router;
