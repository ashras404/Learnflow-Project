import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Account');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Load user data into state
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    const tabs = ['Account', 'Notifications', 'Appearance', 'Privacy & Security'];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px' }}>
            
            {/* Left Sidebar Menu */}
            <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px',
                            backgroundColor: activeTab === tab ? 'var(--bg-card)' : 'transparent',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '15px',
                            fontWeight: activeTab === tab ? '600' : '500',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab}
                        {activeTab === tab && <span>›</span>}
                    </button>
                ))}
            </div>

            {/* Right Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Profile Information Card */}
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--primary)', fontSize: '20px' }}>👤</span> Profile Information
                    </h3>

                    {/* Avatar Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ 
                            width: '80px', height: '80px', borderRadius: '50%', 
                            backgroundColor: '#a855f7', color: 'white', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            fontSize: '32px', fontWeight: '600' 
                        }}>
                            {name ? name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div>
                            <button style={{ 
                                backgroundColor: 'transparent', color: 'var(--text-main)', 
                                border: '1px solid var(--border)', padding: '8px 16px', 
                                borderRadius: '8px', cursor: 'pointer', fontWeight: '500', marginBottom: '8px' 
                            }}>
                                Change Avatar
                            </button>
                            <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: 0 }}>
                                JPG, GIF or PNG. 1MB max.
                            </p>
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', outline: 'none', fontSize: '15px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', outline: 'none', fontSize: '15px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance Card */}
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--primary)', fontSize: '20px' }}>✨</span> Appearance
                    </h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'var(--text-main)', margin: '0 0 4px 0', fontWeight: '600', fontSize: '15px' }}>Theme Preference</p>
                            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '13px' }}>Switch between light and dark mode</p>
                        </div>

                        {/* Custom Toggle Switch */}
                        <div style={{ display: 'flex', backgroundColor: 'var(--bg-main)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                            <button style={{ 
                                padding: '8px 24px', backgroundColor: 'transparent', border: 'none', color: 'var(--text-muted)', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500'
                            }}>
                                Light
                            </button>
                            <button style={{ 
                                padding: '8px 24px', backgroundColor: 'var(--bg-card)', border: 'none', color: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}>
                                Dark
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button style={{ 
                        backgroundColor: 'var(--primary)', color: 'white', border: 'none', 
                        padding: '12px 24px', borderRadius: '10px', fontWeight: '600', 
                        cursor: 'pointer', fontSize: '15px', transition: 'all 0.2s'
                    }}>
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Settings;