import { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // 1. Initialize theme from local storage (default to dark)
    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem('theme') === 'light';
    });

    // 2. Toggle class on the body tag whenever the state changes
    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightMode]);

    if (!user) return <>{children}</>;

    const navItems = [
        { name: 'Dashboard', path: '/', icon: '⊞' },
        { name: 'Tasks', path: '/tasks', icon: '☑' },
        { name: 'AI Assistant', path: '/ai', icon: '✨' },
        { name: 'Notes', path: '/notes', icon: '📄' },
        { name: 'Study Sessions', path: '/study', icon: '⏱' },
        { name: 'Settings', path: '/settings', icon: '⚙' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s ease' }}>
            
            {/* SIDEBAR */}
            <aside style={{
                width: '260px', backgroundColor: 'var(--bg-main)', borderRight: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', padding: '24px 16px', zIndex: 50, transition: 'all 0.3s ease'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px', marginBottom: '40px' }}>
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                        A
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                        Student AI
                    </h2>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} to={item.path}
                            style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px 16px', borderRadius: '12px',
                                textDecoration: 'none', fontSize: '15px', fontWeight: '500',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                backgroundColor: isActive ? 'var(--primary)22' : 'transparent',
                                border: isActive ? '1px solid var(--primary)44' : '1px solid transparent',
                                transition: 'all 0.2s ease'
                            })}
                        >
                            <span style={{ fontSize: '18px', opacity: 0.8 }}>{item.icon}</span> 
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* MAIN CONTENT WRAPPER */}
            <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
                
                {/* TOP BAR */}
                <header style={{
                    height: '80px', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-main)', transition: 'all 0.3s ease'
                }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
                        <input 
                            type="text" placeholder="Search anything..." 
                            style={{
                                width: '100%', padding: '12px 16px 12px 48px',
                                backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: '30px', color: 'var(--text-main)', outline: 'none', fontSize: '14px', transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    {/* Right Icons (Toggle + Notifications + Avatar) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        
                        {/* 3. The New Theme Toggle Button */}
                        <button 
                            onClick={() => setIsLightMode(!isLightMode)}
                            title="Toggle Light/Dark Mode"
                            style={{ 
                                background: 'transparent', border: 'none', fontSize: '20px', 
                                cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {isLightMode ? '🌙' : '☀️'}
                        </button>

                        <span style={{ color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}>🔔</span>
                        
                        <div 
                            onClick={logout} title="Click to logout"
                            style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                backgroundColor: '#a855f7', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: '600', cursor: 'pointer', border: '2px solid var(--bg-main)'
                            }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main style={{ flex: 1, padding: '40px' }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;