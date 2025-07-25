const express = require('express');
const router = express.Router();
const {generateSolution} = require("../controllers/llmController");

router.post("/generate", generateSolution);

module.exports = router;