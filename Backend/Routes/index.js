const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.getUsers);

module.exports = router;

