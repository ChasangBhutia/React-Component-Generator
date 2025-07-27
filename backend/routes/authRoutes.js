const express = require('express');
const { registerUser, loginUser, logout, getUser } = require('../controllers/authControllers');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logout);
router.get('/',authMiddleware, getUser)

module.exports = router;