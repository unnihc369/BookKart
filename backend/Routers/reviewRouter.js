const express = require("express");
const { getAllReview, addReview, deletebyid } = require("../Controllers/ReviewController");



const router = express.Router();

router.get("/all/:bookId", getAllReview);
router.post("/add", addReview);
router.delete("/deletebyid/:userId/:bookId", deletebyid);
module.exports = router;
