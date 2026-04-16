import { useState, useEffect } from 'react';
import { startSession, endSession, fetchStats } from '../services/studyAPI';

const Study = () => {
    const [topic, setTopic] = useState('');
    const [activeSession, setActiveSession] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0); // in seconds
    const [stats, setStats] = useState({ totalMinutes: 0, totalSessions: 0, history: [] });

    // Load stats on mount
    useEffect(() => {
        loadStats();
    }, []);

    // Timer logic
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
            loadStats(); // Refresh stats immediately
        } catch (error) {
            console.error("Failed to end session", error);
        }
    };

    // Helper to format seconds into MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2>⏱️ Study Timer</h2>

            {/* Timer UI */}
            <div style={{ margin: '40px 0', padding: '40px', border: '2px solid #333', borderRadius: '10px' }}>
                <h1 style={{ fontSize: '64px', margin: '0 0 20px 0', fontFamily: 'monospace' }}>
                    {formatTime(elapsedTime)}
                </h1>
                
                {!activeSession ? (
                    <div>
                        <input 
                            type="text" 
                            placeholder="What are you studying? (e.g. Calculus)" 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            style={{ padding: '10px', width: '80%', marginBottom: '20px' }}
                        />
                        <br />
                        <button onClick={handleStart} style={{ padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', fontSize: '18px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Start Session
                        </button>
                    </div>
                ) : (
                    <div>
                        <p style={{ fontSize: '18px', color: '#555' }}>Currently studying: <strong>{activeSession.topic}</strong></p>
                        <button onClick={handleStop} style={{ padding: '15px 30px', backgroundColor: '#f44336', color: 'white', fontSize: '18px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Stop & Save
                        </button>
                    </div>
                )}
            </div>

            {/* Stats Dashboard */}
            <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px' }}>
                <div>
                    <h3>Total Time</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalMinutes} min</p>
                </div>
                <div>
                    <h3>Total Sessions</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalSessions}</p>
                </div>
            </div>
        </div>
    );
};

export default Study;