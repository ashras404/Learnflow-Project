import { useState, useEffect } from 'react';
import { startSession, endSession, fetchStats } from '../services/studyAPI';

const Study = () => {
    const [topic, setTopic] = useState('');
    const [activeSession, setActiveSession] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0); 
    const [stats, setStats] = useState({ totalMinutes: 0, totalSessions: 0, history: [] });

    useEffect(() => {
        loadStats();
    }, []);

    useEffect(() => {
        let interval;
        if (activeSession) {
            interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [activeSession]);

    const loadStats = async () => {
        try {
            const data = await fetchStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to load stats", error);
        }
    };

    const handleStart = async () => {
        try {
            const session = await startSession(topic || 'General Study');
            setActiveSession(session);
            setElapsedTime(0);
        } catch (error) {
            console.error("Failed to start session", error);
        }
    };

    const handleStop = async () => {
        if (!activeSession) return;
        try {
            await endSession(activeSession._id);
            setActiveSession(null);
            setTopic('');
            loadStats();
        } catch (error) {
            console.error("Failed to end session", error);
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <header style={{ marginBottom: '40px', textAlign: 'left' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', margin: '0 0 8px 0' }}>Focus Hub ⏱️</h1>
                <p style={{ color: '#94a3b8', fontSize: '16px' }}>Track your deep work and build a study streak.</p>
            </header>

            {/* Timer Card */}
            <div style={{ 
                backgroundColor: '#16161e', 
                padding: '60px 20px', 
                borderRadius: '24px', 
                border: '1px solid #262626',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                marginBottom: '40px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative glow in the background */}
                <div style={{
                    position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)',
                    width: '200px', height: '200px', backgroundColor: '#6366f1',
                    filter: 'blur(100px)', opacity: activeSession ? 0.2 : 0.05, transition: 'opacity 0.5s'
                }}></div>

                <h1 style={{ 
                    fontSize: '80px', 
                    fontWeight: '700', 
                    fontFamily: 'monospace', 
                    color: activeSession ? '#6366f1' : '#fff',
                    margin: '0 0 20px 0',
                    letterSpacing: '-2px'
                }}>
                    {formatTime(elapsedTime)}
                </h1>

                {!activeSession ? (
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <input 
                            type="text" 
                            placeholder="What are we focusing on? (e.g. Organic Chemistry)" 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            style={{ 
                                padding: '14px 20px', width: '300px', backgroundColor: '#0f0f12',
                                border: '1px solid #262626', color: '#fff', borderRadius: '12px',
                                fontSize: '15px', marginBottom: '25px', outline: 'none'
                            }}
                        />
                        <br />
                        <button onClick={handleStart} style={{ 
                            padding: '16px 40px', backgroundColor: '#6366f1', color: '#fff',
                            fontSize: '18px', fontWeight: '600', border: 'none', borderRadius: '12px',
                            cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                        }}>
                            Start Focus Session
                        </button>
                    </div>
                ) : (
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '30px' }}>
                            Currently: <span style={{ color: '#fff', fontWeight: '600' }}>{activeSession.topic}</span>
                        </p>
                        <button onClick={handleStop} style={{ 
                            padding: '16px 40px', backgroundColor: '#ef444422', color: '#ef4444',
                            fontSize: '18px', fontWeight: '600', border: '1px solid #ef444444',
                            borderRadius: '12px', cursor: 'pointer'
                        }}>
                            Stop & Log Session
                        </button>
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ 
                    backgroundColor: '#16161e', padding: '24px', borderRadius: '16px', border: '1px solid #262626', textAlign: 'left'
                }}>
                    <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Time</p>
                    <h2 style={{ fontSize: '32px', color: '#fff', margin: 0 }}>{stats.totalMinutes} <span style={{ fontSize: '16px', color: '#475569' }}>mins</span></h2>
                </div>
                <div style={{ 
                    backgroundColor: '#16161e', padding: '24px', borderRadius: '16px', border: '1px solid #262626', textAlign: 'left'
                }}>
                    <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Sessions</p>
                    <h2 style={{ fontSize: '32px', color: '#fff', margin: 0 }}>{stats.totalSessions} <span style={{ fontSize: '16px', color: '#475569' }}>completed</span></h2>
                </div>
            </div>
        </div>
    );
};

export default Study;