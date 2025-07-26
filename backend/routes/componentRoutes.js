const express = require("express");
const router = express.Router();
const {
  createComponent,
  getComponentsBySession,
  deleteComponent,
} = require("../controllers/componentControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createComponent);
router.get("/:sessionId", authMiddleware, getComponentsBySession);
router.delete("/:id", authMiddleware, deleteComponent);

module.exports = router;
