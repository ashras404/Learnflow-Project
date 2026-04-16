const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Add the 'protect' middleware to ensure only logged-in users can access these
router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;