const express = require("express");
const { addBookadd, addBookGetall, addBookDelete, addBookAccept } = require("../Controllers/addBookController");


const router = express.Router();

router.post("/add",addBookadd);
router.delete("/delete/:addbook_id", addBookDelete);
router.delete("/accept/:addbook_id", addBookAccept);
router.get('/all',addBookGetall)

module.exports = router;
