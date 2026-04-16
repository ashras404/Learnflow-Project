const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
    try {
        const { title, subject, description, deadline } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: 'Please add a title' });
        }

        const task = await Task.create({
            userId: req.user._id,
            title,
            subject,
            description,
            deadline
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a task (e.g., mark as completed)
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });
        
        // Make sure the logged-in user owns this task
        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Make sure the logged-in user owns this task
        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this task' });
        }

        await task.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };