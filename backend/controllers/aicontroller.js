const { generateAIResponse } = require('../services/aiService');

// @desc    Generate AI Study Content
// @route   POST /api/ai/generate
const generateContent = async (req, res) => {
    const { mode, input } = req.body;

    if (!mode || !input) {
        return res.status(400).json({ message: 'Please provide both a mode and input text' });
    }

    try {
        const aiOutput = await generateAIResponse(mode, input);
        res.status(200).json({ output: aiOutput });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { generateContent };