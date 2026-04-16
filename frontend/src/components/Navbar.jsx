import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Don't show the navbar if the user isn't logged in
  if (!user) return null;

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        backgroundColor: "#1e1e2f",
        color: "white",
        marginBottom: "20px",
      }}
    >
      <div>
        <h3 style={{ margin: 0 }}>🚀 LearnFlow</h3>
      </div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>
          Tasks
        </Link>
        <Link to="/ai" style={{ color: "white", textDecoration: "none" }}>
          AI Studio
        </Link>
        <Link to="/tasks" style={{ color: "white", textDecoration: "none" }}>
          Tasks
        </Link>
        <Link to="/notes" style={{ color: "white", textDecoration: "none" }}>
          Notes
        </Link>
        <Link to="/study" style={{ color: 'white', textDecoration: 'none' }}>Study Timer</Link>
        {/* <Link to="/ai" style={{ color: "white", textDecoration: "none" }}> AI Studio</Link> */}
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ff4c4c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
