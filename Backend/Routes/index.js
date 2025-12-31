const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const upload = require("../Config/upload");

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.getUsers);
router.post("/addProduct", userController.addProduct);
router.get("/getProducts", userController.getProducts);
router.post("/addToCart", userController.addToCart);
router.get("/getCartItems", userController.getCartItems);
router.post("/clearCart", userController.clearCart);
router.delete("/deleteItem/:id", userController.deleteItem);
router.put("/updateQuantity", userController.updateQuantity);
router.post("/updateProfileImage", upload.single('profileImage'), userController.updateProfileImage);
router.post("/addAddress", userController.addAddress);
router.post("/createRazorpayOrder", userController.createRazorpayOrder);
router.post("/createOrder", userController.createOrder);
router.get('/getOrders', userController.getOrders);
module.exports = router;

