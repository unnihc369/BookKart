const express = require("express");
const {
  login,
  createTableAndInsertUser,
} = require("../Controllers/UserControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", createTableAndInsertUser);
router.post("/login", login);

module.exports = router;
