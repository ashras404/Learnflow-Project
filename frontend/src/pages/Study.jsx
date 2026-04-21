import { useState, useEffect } from 'react';
import { startSession, endSession, fetchStats } from '../services/studyAPI';

const Study = () => {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(1500); // 25:00 default
    const [topic, setTopic] = useState('');
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [stats, setStats] = useState({ totalMinutes: 0, totalSessions: 0, history: [] });

    useEffect(() => {
        loadStats();
    }, []);

    // Timer Engine
    useEffect(() => {
        let interval = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else if (seconds === 0 && isActive) {
            handleStop();
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const loadStats = async () => {
        try {
            const data = await fetchStats();
            setStats(data);
        } catch (err) { console.error(err); }
    };

    const handleStart = async () => {
        if (!isActive) {
            try {
                const session = await startSession(topic || 'Deep Work');
                setCurrentSessionId(session._id);
                setIsActive(true);
            } catch (err) { console.error(err); }
        } else {
            setIsActive(false); // Pause functionality
        }
    };

    const handleStop = async () => {
        setIsActive(false);
        if (currentSessionId) {
            try {
                await endSession(currentSessionId);
                loadStats();
                setSeconds(1500);
                setTopic('');
                setCurrentSessionId(null);
            } catch (err) { console.error(err); }
        }
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60).toString().padStart(2, '0');
        const secs = (s % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px' }}>
            
            {/* LEFT COLUMN: TIMER */}
            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border)', padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <header style={{ position: 'absolute', top: '32px', textAlign: 'center' }}>
                    <span style={{ backgroundColor: '#ef444415', color: '#ef4444', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>
                        🎯 POMODORO
                    </span>
                </header>

                {/* Big Circular Timer Container */}
                <div style={{ 
                    width: '320px', height: '320px', borderRadius: '50%', 
                    border: '8px solid var(--border)', display: 'flex', 
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    margin: '40px 0'
                }}>
                    <h1 style={{ fontSize: '84px', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>
                        {formatTime(seconds)}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px', fontWeight: '600' }}>
                        {isActive ? 'Focusing...' : 'Paused'}
                    </p>
                </div>

                <input 
                    type="text" 
                    placeholder="What are you studying?" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', color: 'white', padding: '12px', textAlign: 'center', width: '250px', outline: 'none', marginBottom: '32px' }}
                />

                <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={handleStart} style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' }}>
                        {isActive ? '||' : '▶'}
                    </button>
                    <button onClick={() => setSeconds(1500)} style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        ↺
                    </button>
                    {isActive && <button onClick={handleStop} style={{ padding: '0 24px', borderRadius: '32px', backgroundColor: '#ef4444', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Stop & Save</button>}
                </div>
            </div>

            {/* RIGHT COLUMN: STATS & HISTORY */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Small Stat Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                    <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                        <p style={{ color: '#10b981', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>🕒 TODAY</p>
                        <h2 style={{ margin: 0, fontSize: '24px' }}>{stats.totalMinutes}m</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>+15m vs yesterday</p>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                        <p style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>📅 WEEKLY</p>
                        <h2 style={{ margin: 0, fontSize: '24px' }}>{(stats.totalMinutes / 60).toFixed(1)}h</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>85% of goal reached</p>
                    </div>
                </div>

                {/* Recent Sessions List */}
                <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border)', flex: 1, padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)' }}>◎</span> Recent Sessions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {stats.history.slice(0, 5).reverse().map(session => (
                            <div key={session._id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{session.topic}</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>{session.duration} min</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Study;