const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getAllBooks, addbook, getBookById } = require("../Controllers/BooksController");

const router = express.Router();

router.get("/all",protect, getAllBooks);
router.post("/add", addbook);
router.get('/getbyid/:id',getBookById);
module.exports = router;
