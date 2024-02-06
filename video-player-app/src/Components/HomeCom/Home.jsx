// src/components/Home.js
// Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <div>
      <nav className="navbarhome">
        <div>
          <Link to="/" className="navbar-brand">
            Video App
          </Link>
        </div>
        <div className="dropdowns">
          <div className="dropdown">
            <button onClick={handleLogout} className="button-logout">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="home-container">
        <h2>Welcome to Video App</h2>
        <div>
          <Link to="/add-video">
            <div className="option-box">Add Video</div>
          </Link>
          <Link to="/display-videos">
            <div className="option-box">Display All Videos</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
