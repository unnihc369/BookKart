const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { addPayment, paymentByUserId } = require("../Controllers/PaymentController");

const router = express.Router();

router.post("/add", protect,addPayment );
router.get("/getbyid", protect, paymentByUserId);

module.exports = router;
