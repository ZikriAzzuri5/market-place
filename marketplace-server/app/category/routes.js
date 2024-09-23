const router = require("express").Router();

const categoryController = require("./controller");

router.get("/categories", categoryController.index);

router.post("/categories", categoryController.create);

router.put("/categories/:id", categoryController.update);

router.delete("/categories/:id", categoryController.destroy);

module.exports = router;
