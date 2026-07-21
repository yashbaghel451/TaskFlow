import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTasks,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="logo">
        🚀 TaskFlow
      </Link>

      <div className="nav-links">
        <Link
          className={location.pathname === "/dashboard" ? "active" : ""}
          to="/dashboard"
        >
          <FaHome /> Dashboard
        </Link>

        <Link
          className={location.pathname === "/tasks" ? "active" : ""}
          to="/tasks"
        >
          <FaTasks /> Tasks
        </Link>

        <Link
          className={location.pathname === "/profile" ? "active" : ""}
          to="/profile"
        >
          <FaUserCircle /> Profile
        </Link>

        <span className="nav-user">
          👋 Hi, <strong>{user?.name}</strong>
        </span>

        <button className="btn btn-secondary" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button onClick={handleLogout} className="btn btn-danger">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
