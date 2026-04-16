const StudySession = require('../models/StudySession');

// @desc    Start a new study session
// @route   POST /api/study/start
const startSession = async (req, res) => {
    try {
        const session = await StudySession.create({
            userId: req.user._id,
            topic: req.body.topic || 'General Study',
            startTime: new Date()
        });
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    End a study session and calculate duration
// @route   PUT /api/study/end/:id
const endSession = async (req, res) => {
    try {
        const session = await StudySession.findById(req.params.id);

        if (!session) return res.status(404).json({ message: 'Session not found' });
        if (session.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const endTime = new Date();
        // Calculate duration in minutes
        const durationMs = endTime - new Date(session.startTime);
        const durationMinutes = Math.round(durationMs / 60000);

        session.endTime = endTime;
        session.duration = durationMinutes;
        await session.save();

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's study stats
// @route   GET /api/study/stats
const getStats = async (req, res) => {
    try {
        const sessions = await StudySession.find({ userId: req.user._id, duration: { $exists: true } });
        
        const totalMinutes = sessions.reduce((acc, session) => acc + session.duration, 0);
        const totalSessions = sessions.length;

        res.status(200).json({ totalMinutes, totalSessions, history: sessions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { startSession, endSession, getStats };