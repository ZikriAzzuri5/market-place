const router = require("express").Router();

const userController = require("./controller");

router.get("/users", userController.index);

router.post("/users", userController.create);

router.put("/users/:id", userController.update);

router.delete("/users/:id", userController.destroy);

module.exports = router;
