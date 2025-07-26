const express = require("express");
const router = express.Router();
const { saveChat, getChatsBySession } = require("../controllers/chatControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, saveChat);
router.get("/:sessionId", authMiddleware, getChatsBySession);

module.exports = router;
