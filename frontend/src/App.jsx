import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './index.css';

// Components
import Sidebar from './components/Navbar';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Study from './pages/Study';
import AIStudio from './pages/AIStudio';

// A small sub-component to handle the dynamic layout
const LayoutWrapper = ({ children }) => {
    const { user } = useContext(AuthContext);
    
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f0f12' }}>
            {user && <Sidebar />}
            <main style={{ 
                flex: 1, 
                marginLeft: user ? '240px' : '0px', 
                padding: user ? '40px' : '0px',
                transition: 'margin 0.3s ease'
            }}>
                {children}
            </main>
        </div>
    );
};

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <LayoutWrapper>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Navigate to="/tasks" />} />
                        
                        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                        <Route path="/study" element={<ProtectedRoute><Study /></ProtectedRoute>} />
                        <Route path="/ai" element={<ProtectedRoute><AIStudio /></ProtectedRoute>} />
                    </Routes>
                </LayoutWrapper>
            </Router>
        </AuthProvider>
    );
}

export default App;