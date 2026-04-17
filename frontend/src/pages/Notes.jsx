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
        try { const data = await fetchNotes(); setSavedNotes(data); } catch (err) { console.error(err); }
    };

    const handleGenerate = async () => {
        if (!rawText) return;
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const res = await axios.post('http://localhost:5000/api/ai/generate', { mode: 'notes', input: rawText }, { headers: { Authorization: `Bearer ${user?.token}` } });
            setGeneratedNote(res.data.output);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleSave = async () => {
        if (!title || !generatedNote) return;
        try { await createNote({ title, content: generatedNote }); setTitle(''); setGeneratedNote(''); setRawText(''); loadNotes(); } catch (err) { console.error(err); }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#fff' }}>Smart Notes</h1>
                <p style={{ color: '#94a3b8' }}>Convert messy lectures into structured study guides.</p>
            </header>

            {/* AI Generator Box */}
            <div style={{ backgroundColor: '#16161e', padding: '24px', borderRadius: '16px', border: '1px solid #262626', marginBottom: '40px' }}>
                <h3 style={{ color: '#fff', marginBottom: '16px' }}>Generate New Notes</h3>
                <textarea 
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste lecture transcript or messy notes here..."
                    style={{ width: '100%', height: '120px', backgroundColor: '#0f0f12', color: '#fff', border: '1px solid #262626', borderRadius: '8px', padding: '12px', outline: 'none', marginBottom: '16px', resize: 'vertical' }}
                />
                <button onClick={handleGenerate} disabled={loading} style={{ backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                    {loading ? '🧠 AI is Thinking...' : '✨ Generate Notes'}
                </button>

                {generatedNote && (
                    <div style={{ marginTop: '24px', padding: '20px', backgroundColor: '#1e1e2f', borderRadius: '12px', border: '1px solid #6366f144' }}>
                        <input 
                            type="text" placeholder="Note Title (e.g., Chemistry Week 2)" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#0f0f12', border: '1px solid #262626', color: '#fff', borderRadius: '6px', marginBottom: '15px' }}
                        />
                        <div style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{generatedNote}</div>
                        <button onClick={handleSave} style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                            💾 Save to Library
                        </button>
                    </div>
                )}
            </div>

            {/* Saved Library */}
            <h3 style={{ color: '#fff', marginBottom: '20px' }}>Saved Library</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {savedNotes.map(note => (
                    <div key={note._id} style={{ backgroundColor: '#16161e', padding: '20px', borderRadius: '12px', border: '1px solid #262626' }}>
                        <h4 style={{ color: '#6366f1', marginBottom: '10px' }}>{note.title}</h4>
                        <div style={{ color: '#94a3b8', fontSize: '13px', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                            {note.content}
                        </div>
                        <button onClick={() => deleteNote(note._id).then(loadNotes)} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', padding: 0 }}>Delete Note</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;