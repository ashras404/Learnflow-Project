const express = require('express');
const router = express.Router();
const { startSession, endSession, getStats } = require('../controllers/studyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start', protect, startSession);
router.put('/end/:id', protect, endSession);
router.get('/stats', protect, getStats);

module.exports = router;