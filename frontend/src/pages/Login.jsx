import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data);
            navigate('/tasks');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f0f12',
            marginLeft: '-240px' // This offsets the sidebar space for the login screen
        }}>
            <form onSubmit={handleSubmit} style={{
                backgroundColor: '#16161e',
                padding: '40px',
                borderRadius: '16px',
                border: '1px solid #262626',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <h2 style={{ color: '#fff', marginBottom: '8px', fontSize: '28px' }}>Welcome Back</h2>
                <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Please enter your details to sign in.</p>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontSize: '14px' }}>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required 
                        style={{
                            width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #262626',
                            backgroundColor: '#0f0f12', color: '#fff', outline: 'none'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontSize: '14px' }}>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required 
                        style={{
                            width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #262626',
                            backgroundColor: '#0f0f12', color: '#fff', outline: 'none'
                        }}
                    />
                </div>

                <button type="submit" style={{
                    width: '100%', padding: '14px', borderRadius: '8px', border: 'none',
                    backgroundColor: '#6366f1', color: '#fff', fontWeight: '600',
                    cursor: 'pointer', fontSize: '16px'
                }}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;