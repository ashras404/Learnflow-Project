import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return null;

    const navItems = [
        { name: 'Tasks', path: '/tasks', icon: '✅' },
        { name: 'Notes', path: '/notes', icon: '📝' },
        { name: 'Study', path: '/study', icon: '⏱️' },
        { name: 'AI Studio', path: '/ai', icon: '✨' },
    ];

    return (
        <div style={{
            width: '240px', height: '100vh', backgroundColor: '#16161e',
            borderRight: '1px solid #262626', position: 'fixed',
            display: 'flex', flexDirection: 'column', padding: '20px', zIndex: 10
        }}>
            <h2 style={{ color: '#6366f1', marginBottom: '30px' }}>LearnFlow</h2>
            <div style={{ flex: 1 }}>
                {navItems.map((item) => (
                    <NavLink 
                        key={item.path} 
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'block', padding: '12px', marginBottom: '5px',
                            textDecoration: 'none', borderRadius: '8px',
                            color: isActive ? '#fff' : '#94a3b8',
                            backgroundColor: isActive ? '#6366f122' : 'transparent'
                        })}
                    >
                        {item.icon} {item.name}
                    </NavLink>
                ))}
            </div>
            <button onClick={() => { logout(); navigate('/login'); }} style={{
                padding: '10px', background: 'transparent', color: '#ff4c4c',
                border: '1px solid #ff4c4c', borderRadius: '6px', cursor: 'pointer'
            }}>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;