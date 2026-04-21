import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AIStudio = () => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('explain');
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Hi! I'm your AI study assistant. How can I help you today?\n\nTry selecting a mode above or just ask me anything!" }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const modes = [
        { id: 'explain', label: '🔍 Explain', icon: '🧠' },
        { id: 'summarize', label: '📄 Summarize', icon: '📝' },
        { id: 'flashcards', label: '📇 Flashcards', icon: '✨' },
        { id: 'notes', label: '🪄 Notes Converter', icon: '📝' }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const response = await axios.post(
                'http://localhost:5000/api/ai/generate',
                { mode, input: userMessage },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            
            setMessages(prev => [...prev, { role: 'bot', content: response.data.output }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I ran into an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Header & Modes */}
            <header style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--primary)' }}>✨</span> AI Assistant
                </h1>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {modes.map((m) => (
                        <button 
                            key={m.id} 
                            onClick={() => setMode(m.id)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: mode === m.id ? 'var(--primary)' : 'var(--bg-card)',
                                color: mode === m.id ? '#fff' : 'var(--text-muted)',
                                border: `1px solid ${mode === m.id ? 'var(--primary)' : 'var(--border)'}`,
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span>{m.id === mode ? '✓' : m.icon}</span> {m.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* Chat Window */}
            <div style={{ 
                flex: 1, 
                backgroundColor: 'var(--bg-card)', 
                borderRadius: '24px', 
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ 
                            display: 'flex', 
                            gap: '16px', 
                            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                            alignItems: 'flex-start'
                        }}>
                            {/* Avatar */}
                            <div style={{ 
                                width: '36px', height: '36px', borderRadius: '10px',
                                backgroundColor: msg.role === 'bot' ? 'var(--primary)' : '#475569',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0
                            }}>
                                {msg.role === 'bot' ? '🤖' : '👤'}
                            </div>

                            {/* Bubble */}
                            <div style={{ 
                                maxWidth: '70%',
                                padding: '16px 20px',
                                borderRadius: msg.role === 'bot' ? '0 20px 20px 20px' : '20px 0 20px 20px',
                                backgroundColor: msg.role === 'bot' ? 'var(--bg-main)' : 'var(--primary)',
                                border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                                color: '#fff',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                whiteSpace: 'pre-wrap'
                            }}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                            <div style={{ padding: '16px 20px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '0 20px 20px 20px', color: 'var(--text-muted)' }}>
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{ padding: '24px', backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
                    <form onSubmit={handleSend} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        backgroundColor: 'var(--bg-main)', 
                        borderRadius: '16px', 
                        border: '1px solid var(--border)',
                        padding: '8px 16px'
                    }}>
                        <input 
                            type="text" 
                            placeholder={`Type a message to ${mode}...`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{ 
                                flex: 1, background: 'transparent', border: 'none', color: '#fff', 
                                padding: '12px', outline: 'none', fontSize: '15px' 
                            }}
                        />
                        <button type="submit" style={{ 
                            backgroundColor: 'var(--primary)', 
                            color: '#fff', 
                            border: 'none', 
                            width: '40px', height: '40px', 
                            borderRadius: '10px', 
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '18px'
                        }}>
                            ➔
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AIStudio;