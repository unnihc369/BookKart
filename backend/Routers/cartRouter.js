const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { getCartAll, addtoCart, removeFromCart } = require("../Controllers/CartController");

const router = express.Router();

router.post("/addCart", addtoCart);
router.get("/getCart/:userId", getCartAll);
router.delete("/delcart/:cartId",removeFromCart );

module.exports = router;
