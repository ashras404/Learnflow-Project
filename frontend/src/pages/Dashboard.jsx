import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchTasks } from '../services/taskAPI';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [aiQuery, setAiQuery] = useState('');

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await fetchTasks();
                // Get only up to 3 pending tasks for the dashboard
                setTasks(data.filter(t => t.status === 'pending').slice(0, 3));
            } catch (err) { console.error(err); }
        };
        loadTasks();
    }, []);

    const firstName = user?.name?.split(' ')[0] || 'Student';

    const handleAiSubmit = (e) => {
        e.preventDefault();
        if (aiQuery.trim()) {
            navigate('/ai', { state: { initialQuery: aiQuery } });
        }
    };

    const getSubjectStyle = (sub) => {
        const lower = (sub || '').toLowerCase();
        if (lower === 'biology') return { text: '#818cf8', bg: '#818cf815' }; 
        if (lower === 'math') return { text: '#a855f7', bg: '#a855f715' }; 
        if (lower === 'history') return { text: '#3b82f6', bg: '#3b82f615' }; 
        return { text: '#94a3b8', bg: '#94a3b815' }; 
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Greeting */}
            <div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 8px 0' }}>
                    Good morning, {firstName}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0 }}>
                    Ready to crush your study goals today?
                </p>
            </div>

            {/* Quick AI Search Bar */}
            <form 
                onSubmit={handleAiSubmit}
                style={{ 
                    display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-card)', 
                    padding: '12px 12px 12px 24px', borderRadius: '16px', border: '1px solid var(--border)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
            >
                <span style={{ color: 'var(--primary)', fontSize: '20px', marginRight: '16px' }}>✨</span>
                <input 
                    type="text" 
                    placeholder="Ask AI to explain a concept, summarize notes, or generate flashcards..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '15px', outline: 'none' }}
                />
                <button type="submit" style={{ 
                    backgroundColor: 'var(--primary)', color: 'white', border: 'none', 
                    padding: '10px 24px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                    Ask AI <span style={{ fontSize: '16px' }}>⌘</span>
                </button>
            </form>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                
                {/* Left Column: Tasks */}
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                            <span style={{ color: '#10b981' }}>☑</span> Today's Tasks
                        </h3>
                        <button onClick={() => navigate('/tasks')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                            View all →
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {tasks.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No pending tasks! Enjoy your day.</p>
                        ) : (
                            tasks.map(task => {
                                const style = getSubjectStyle(task.subject);
                                return (
                                    <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--border)', borderRadius: '16px', backgroundColor: 'var(--bg-main)' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #475569' }}></div>
                                        <div>
                                            <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '500', color: 'var(--text-main)' }}>{task.title}</h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '6px', backgroundColor: style.bg, color: style.text }}>
                                                    {task.subject || 'General'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Right Column: Streak & Deadlines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Study Streak */}
                    <div style={{ backgroundColor: '#261b17', padding: '24px', borderRadius: '20px', border: '1px solid #432c21', position: 'relative', overflow: 'hidden' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                            <span style={{ color: '#f97316' }}>🔥</span> Study Streak
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '48px', fontWeight: '800', color: '#f97316', lineHeight: '1' }}>12</span>
                            <span style={{ color: '#fdba74', fontWeight: '500' }}>Days</span>
                        </div>
                        <p style={{ margin: 0, color: '#fdba74', fontSize: '14px', lineHeight: '1.5', opacity: 0.8 }}>
                            You're in the top 15% of consistent learners!
                        </p>
                        {/* Background subtle flame icon */}
                        <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '120px', opacity: 0.05 }}>🔥</div>
                    </div>

                    {/* Deadlines Mockup */}
                    <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)' }}>
                            <span style={{ color: '#ef4444' }}>📅</span> Deadlines
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ backgroundColor: '#ef444415', color: '#ef4444', padding: '8px 12px', borderRadius: '12px', textAlign: 'center', minWidth: '50px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Oct</div>
                                    <div style={{ fontSize: '18px', fontWeight: '700' }}>24</div>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: 'var(--text-main)' }}>Physics Midterm</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Covers chapters 1-5</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ backgroundColor: '#3b82f615', color: '#3b82f6', padding: '8px 12px', borderRadius: '12px', textAlign: 'center', minWidth: '50px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Oct</div>
                                    <div style={{ fontSize: '18px', fontWeight: '700' }}>28</div>
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: 'var(--text-main)' }}>History Essay</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>1,500 words minimum</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;