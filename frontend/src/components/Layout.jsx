import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            
            {/* SIDEBAR */}
            <aside style={{
                width: '260px',
                backgroundColor: 'var(--bg-main)',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                padding: '24px 16px',
                zIndex: 50
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px', marginBottom: '40px' }}>
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                        A
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                        Student AI
                    </h2>
                </div>

                {/* Navigation Links */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.path}
                            style={({ isActive }) => ({
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px 16px', borderRadius: '12px',
                                textDecoration: 'none', fontSize: '15px', fontWeight: '500',
                                color: isActive ? '#ffffff' : 'var(--text-muted)',
                                backgroundColor: isActive ? '#6366f122' : 'transparent',
                                border: isActive ? '1px solid #6366f144' : '1px solid transparent',
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
                    height: '80px',
                    padding: '0 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-main)'
                }}>
                    {/* Search Bar */}
                    <div style={{ position: 'relative', width: '400px' }}>
                        <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search anything..." 
                            style={{
                                width: '100%', padding: '12px 16px 12px 48px',
                                backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
                                borderRadius: '30px', color: 'var(--text-main)', outline: 'none', fontSize: '14px'
                            }}
                        />
                    </div>

                    {/* Right Icons (Notifications + Avatar) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}>🔔</span>
                        <div 
                            onClick={logout}
                            title="Click to logout"
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