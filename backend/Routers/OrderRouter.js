const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { addOrder, orderByUserId } = require("../Controllers/OrderController");

const router = express.Router();

router.post("/add", addOrder);
router.get("/getbyid/:userId", orderByUserId);

module.exports = router;
