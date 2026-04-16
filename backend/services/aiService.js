const axios = require('axios');

const generateAIResponse = async (mode, input) => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // We are using Gemini 1.5 Flash for fast, reliable text generation
    // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    let systemPrompt = "";

    // Apply strict prompt engineering based on the requested mode
    switch (mode) {
        case 'explain':
            systemPrompt = "Explain the following concept simply and step-by-step, as if to a high school student:\n\n";
            break;
        case 'summarize':
            systemPrompt = "Summarize the following text using a structured hierarchy and concise bullet points:\n\n";
            break;
        case 'flashcards':
            systemPrompt = "Create study flashcards from the following text. Format strictly as:\nQ: [Question]\nA: [Answer]\n\nText:\n";
            break;
        case 'notes':
            systemPrompt = "Convert the following raw text into structured, exam-ready revision notes with clear markdown headings:\n\n";
            break;
        case 'solve':
            systemPrompt = "Solve the following problem directly, then provide a clear, step-by-step explanation of how you arrived at the answer:\n\n";
            break;
        default:
            systemPrompt = "Respond to the following prompt:\n\n";
    }

    const finalPrompt = `${systemPrompt}${input}`;

    // Structure the payload exactly as the Gemini API requires
    const payload = {
        contents: [{ parts: [{ text: finalPrompt }] }]
    };

    try {
        const response = await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        
        // Extract just the AI's text from the nested response object
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        throw new Error('Failed to generate AI response');
    }
};

module.exports = { generateAIResponse };