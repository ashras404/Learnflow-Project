import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";

// Components & Pages
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import AIStudio from "./pages/AIStudio";
import Notes from "./pages/Notes";
import Study from './pages/Study';
// Placeholder for Register (we will build this later)
const Register = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>Register Page</h2>
    <p>Coming soon...</p>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If there is no user logged in, send them to the login page
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar sits outside Routes so it shows on every page */}
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Default Route - Redirects straight to Tasks */}
          <Route path="/" element={<Navigate to="/tasks" />} />

          {/* Protected Routes */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai"
            element={
              <ProtectedRoute>
                <AIStudio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route 
    path="/study" 
    element={
        <ProtectedRoute>
            <Study />
        </ProtectedRoute>
    } 
/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
