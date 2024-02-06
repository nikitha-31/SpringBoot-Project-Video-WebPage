import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css';

const HomeUI = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  return (
    <div>
      <nav className="navbarhome">
        <div>
          <a href="#" className="navbar-brand">
            Video Player App
          </a>
        </div>
        <div className="dropdowns">
          <div className="dropdown">
            <button onClick={toggleLoginDropdown} className="button-logout">
              Login
            </button>
            {showLoginDropdown && (
              <div className="dropdown-content">
                <Link to="/login/admin" className="dropdown-link">
                  As Admin
                </Link>
                <Link to="/login/user" className="dropdown-link">
                  As User
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className='container'>
        <div className='image'>
          {/* Video Player or other content can be added here */}
          <p>Video Player Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default HomeUI;
