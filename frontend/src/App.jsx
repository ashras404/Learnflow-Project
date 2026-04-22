import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './index.css';

// Layout & Pages
import Layout from './components/Layout';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Study from './pages/Study';
import AIStudio from './pages/AIStudio';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        
                        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
                        <Route path="/study" element={<ProtectedRoute><Study /></ProtectedRoute>} />
                        <Route path="/ai" element={<ProtectedRoute><AIStudio /></ProtectedRoute>} />
                        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;