import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchNotes, createNote, deleteNote } from '../services/noteAPI';

const Notes = () => {
    const [savedNotes, setSavedNotes] = useState([]);
    const [rawText, setRawText] = useState('');
    const [generatedNote, setGeneratedNote] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const data = await fetchNotes();
            setSavedNotes(data);
        } catch (error) {
            console.error("Failed to load notes", error);
        }
    };

    const handleGenerate = async () => {
        if (!rawText) return;
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const response = await axios.post(
                'http://localhost:5000/api/ai/generate',
                { mode: 'notes', input: rawText },
                { headers: { Authorization: `Bearer ${user?.token}` } }
            );
            setGeneratedNote(response.data.output);
        } catch (error) {
            console.error("AI Generation failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!title || !generatedNote) return;
        try {
            await createNote({ title, content: generatedNote });
            setTitle('');
            setGeneratedNote('');
            setRawText('');
            loadNotes(); // Refresh list
        } catch (error) {
            console.error("Failed to save note", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNote(id);
            loadNotes();
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>📝 Smart Notes</h2>

            {/* AI Generation Section */}
            <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid gray', borderRadius: '5px' }}>
                <h3>Create New Notes</h3>
                <textarea 
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste your messy, raw notes or transcript here..."
                    style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '10px' }}
                />
                <button onClick={handleGenerate} disabled={loading} style={{ marginBottom: '20px' }}>
                    {loading ? 'Structuring Notes...' : '✨ Generate Structured Notes'}
                </button>

                {generatedNote && (
                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f4f4f4', borderRadius: '5px' }}>
                        <input 
                            type="text" 
                            placeholder="Enter Note Title to Save..." 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        />
                        <div style={{ whiteSpace: 'pre-wrap', marginBottom: '15px' }}>{generatedNote}</div>
                        <button onClick={handleSave} style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                            💾 Save to My Notes
                        </button>
                    </div>
                )}
            </div>

            {/* Saved Notes Section */}
            <div>
                <h3>My Saved Notes</h3>
                {savedNotes.length === 0 && <p>No notes saved yet.</p>}
                {savedNotes.map(note => (
                    <div key={note._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>{note.title}</h4>
                            <button onClick={() => handleDelete(note._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                Delete
                            </button>
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', color: '#555' }}>
                            {note.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;