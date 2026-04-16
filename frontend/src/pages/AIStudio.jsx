import { useState } from 'react';
import axios from 'axios';

const AIStudio = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('explain');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!input) return;
        
        setLoading(true);
        setError('');
        setOutput('');

        try {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const response = await axios.post(
                'http://localhost:5000/api/ai/generate',
                { mode, input },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            
            setOutput(response.data.output);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate content. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>✨ AI Study Assistant</h2>
            
            {/* Mode Selectors */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {['explain', 'summarize', 'flashcards', 'notes', 'solve'].map((m) => (
                    <button 
                        key={m} 
                        onClick={() => setMode(m)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: mode === m ? '#4CAF50' : '#ddd',
                            color: mode === m ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Type here to ${mode}... (e.g., "How does photosynthesis work?")`}
                style={{ width: '100%', height: '120px', padding: '10px', marginBottom: '10px' }}
            />
            
            <button 
                onClick={handleGenerate} 
                disabled={loading}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
                {loading ? '🧠 Generating...' : 'Generate AI Output'}
            </button>

            {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

            {/* Output Area */}
            {output && (
                <div style={{ 
                    marginTop: '30px', 
                    padding: '20px', 
                    backgroundColor: '#f9f9f9', 
                    borderLeft: '5px solid #4CAF50',
                    whiteSpace: 'pre-wrap', // This keeps the formatting/line breaks!
                    color: '#333'
                }}>
                    {output}
                </div>
            )}
        </div>
    );
};

export default AIStudio;