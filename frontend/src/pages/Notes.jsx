import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchNotes, createNote, deleteNote } from '../services/noteAPI';

const Notes = () => {
    const [savedNotes, setSavedNotes] = useState([]);
    const [rawText, setRawText] = useState('');
    const [generatedNote, setGeneratedNote] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadNotes(); }, []);

    const loadNotes = async () => {
        try { const data = await fetchNotes(); setSavedNotes(data); } 
        catch (err) { console.error(err); }
    };

    const handleGenerate = async () => {
        if (!rawText) return;
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const res = await axios.post(
                'http://localhost:5000/api/ai/generate', 
                { mode: 'notes', input: rawText }, 
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            setGeneratedNote(res.data.output);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSave = async () => {
        if (!title || !generatedNote) return;
        try { 
            await createNote({ title, content: generatedNote }); 
            setTitle(''); setGeneratedNote(''); setRawText(''); loadNotes(); 
        } catch (err) { console.error(err); }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Header Section */}
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 8px 0' }}>
                    Notes Processing
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', margin: 0 }}>
                    Paste your rough notes to generate summaries, key points, and flashcards.
                </p>
            </header>

            {/* Split Screen Generator */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '24px', 
                marginBottom: '48px',
                height: '500px' // Fixed height to match the screenshot perfectly
            }}>
                
                {/* Left Panel: Raw Notes */}
                <div style={{ 
                    backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', 
                    borderRadius: '16px', display: 'flex', flexDirection: 'column', padding: '20px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: 'var(--primary)' }}>≡</span> Raw Notes
                        </h3>
                        <button onClick={() => setRawText('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}>
                            Clear
                        </button>
                    </div>
                    
                    <textarea 
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        placeholder="Paste your messy lecture notes, article text, or video transcript here..."
                        style={{ 
                            flex: 1, backgroundColor: 'transparent', color: 'var(--text-main)', 
                            border: 'none', outline: 'none', fontSize: '15px', resize: 'none', lineHeight: '1.6' 
                        }}
                    />
                    
                    <button 
                        onClick={handleGenerate} 
                        disabled={loading || !rawText.trim()}
                        style={{ 
                            backgroundColor: (loading || !rawText.trim()) ? '#334155' : 'var(--primary)', 
                            color: 'white', border: 'none', padding: '14px', borderRadius: '12px', 
                            fontWeight: '600', fontSize: '15px', cursor: (loading || !rawText.trim()) ? 'not-allowed' : 'pointer',
                            marginTop: '16px', transition: 'all 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                        }}
                    >
                        {loading ? 'Processing...' : '✨ Generate with AI'}
                    </button>
                </div>

                {/* Right Panel: AI Output */}
                <div style={{ 
                    backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', 
                    borderRadius: '16px', display: 'flex', flexDirection: 'column', padding: '20px'
                }}>
                    <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ color: '#10b981' }}>📄</span> AI Output
                    </h3>

                    {!generatedNote ? (
                        // Empty State (Matches your screenshot)
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '0 40px' }}>
                            <span style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>🪄</span>
                            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>Paste your notes on the left and click generate to instantly get a structured summary and study materials.</p>
                        </div>
                    ) : (
                        // Generated State
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <input 
                                type="text" 
                                placeholder="Give this note a title..." 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', marginBottom: '16px', outline: 'none' }}
                            />
                            <div style={{ flex: 1, overflowY: 'auto', whiteSpace: 'pre-wrap', color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', paddingRight: '8px' }}>
                                {generatedNote}
                            </div>
                            <button onClick={handleSave} style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
                                💾 Save to Library
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Saved Library (Kept minimal to match aesthetic) */}
            {savedNotes.length > 0 && (
                <div>
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '20px', fontSize: '18px' }}>My Library</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {savedNotes.map(note => (
                            <div key={note._id} style={{ backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)', position: 'relative' }}>
                                <h4 style={{ color: 'var(--primary)', margin: '0 0 8px 0', fontSize: '16px' }}>{note.title}</h4>
                                <div style={{ color: 'var(--text-muted)', fontSize: '13px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                                    {note.content}
                                </div>
                                <button onClick={() => deleteNote(note._id).then(loadNotes)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.5 }}>×</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;