const express = require('express');
const router = express.Router();
const { generateContent } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// The route is protected so only logged-in users use your AI quota
router.post('/generate', protect, generateContent);

module.exports = router;