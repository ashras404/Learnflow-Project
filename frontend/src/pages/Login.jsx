import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/auth/login', {
    //             email,
    //             password
    //         });
            
    //         // Save user to context & local storage
    //         login(response.data);
            
    //         // Redirect to Tasks page
    //         navigate('/tasks');
    //     } catch (err) {
    //         setError(err.response?.data?.message || 'Login failed');
    //     }
    // };
    const handleLogin = async (e) => {
    e.preventDefault();
    console.log("1. Login button clicked! Email:", email); 
    
    try {
        console.log("2. Sending request to backend..."); 
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password
        });
        
        console.log("3. Success! Backend responded:", response.data); 
        
        login(response.data);
        console.log("4. User saved. Navigating to /tasks..."); 
        
        navigate('/tasks');
    } catch (err) {
        console.error("💥 ERROR CAUGHT:", err); 
        setError(err.response?.data?.message || err.message || 'Login failed');
    }
};
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid gray', borderRadius: '5px' }}>
            <h2>Login to LearnFlow</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;