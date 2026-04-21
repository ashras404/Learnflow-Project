import { useState } from 'react';
import axios from 'axios';

const AIStudio = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('explain');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const modes = [
        { id: 'explain', label: '🧠 Explain Topic' },
        { id: 'summarize', label: '📝 Summarize' },
        { id: 'flashcards', label: '📇 Flashcards' },
        { id: 'solve', label: '🔢 Solve Problem' }
    ];

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
            setError(err.response?.data?.message || 'Failed to connect to the AI engine.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', margin: '0 0 8px 0' }}>
                    AI Studio ✨
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
                    Your personal AI tutor. Choose a mode and start learning.
                </p>
            </header>

            {/* Mode Selector (Pill Design) */}
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px', 
                marginBottom: '30px' 
            }}>
                {modes.map((m) => (
                    <button 
                        key={m.id} 
                        onClick={() => setMode(m.id)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: mode === m.id ? '#6366f1' : '#16161e',
                            color: mode === m.id ? '#ffffff' : '#94a3b8',
                            border: `1px solid ${mode === m.id ? '#6366f1' : '#262626'}`,
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: mode === m.id ? '600' : '400',
                            transition: 'all 0.2s ease',
                            boxShadow: mode === m.id ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                        }}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div style={{ 
                backgroundColor: '#16161e', 
                padding: '24px', 
                borderRadius: '16px', 
                border: '1px solid #262626',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
            }}>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`What do you want to ${mode}? Type or paste your material here...`}
                    style={{ 
                        width: '100%', 
                        height: '140px', 
                        backgroundColor: '#0f0f12',
                        color: '#e2e8f0',
                        border: '1px solid #262626',
                        borderRadius: '8px',
                        padding: '16px', 
                        marginBottom: '20px',
                        fontSize: '15px',
                        lineHeight: '1.5',
                        outline: 'none',
                        resize: 'vertical'
                    }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {error && <span style={{ color: '#ef4444', marginRight: 'auto', fontSize: '14px' }}>{error}</span>}
                    <button 
                        onClick={handleGenerate} 
                        disabled={loading || !input.trim()}
                        style={{ 
                            padding: '12px 28px', 
                            fontSize: '15px', 
                            backgroundColor: (loading || !input.trim()) ? '#334155' : '#6366f1',
                            color: (loading || !input.trim()) ? '#94a3b8' : '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {loading ? 'Processing...' : 'Generate Output'}
                    </button>
                </div>
            </div>

            {/* Output Area */}
            {output && (
                <div style={{ 
                    marginTop: '40px', 
                    padding: '30px', 
                    backgroundColor: '#16161e', 
                    borderRadius: '16px',
                    border: '1px solid #262626',
                    borderLeft: '4px solid #6366f1', // Electric purple accent line
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                }}>
                    <h3 style={{ color: '#fff', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
                        Response
                    </h3>
                    <div style={{ 
                        whiteSpace: 'pre-wrap', 
                        color: '#e2e8f0', 
                        fontSize: '15px', 
                        lineHeight: '1.7' 
                    }}>
                        {output}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIStudio;