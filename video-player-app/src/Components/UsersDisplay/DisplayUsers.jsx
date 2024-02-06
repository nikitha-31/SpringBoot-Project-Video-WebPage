import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../urls/baseurl";
import { GetAllVideos } from "../../urls/videoService";

import './DisplayUsers.css';

const DisplayUsers = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await GetAllVideos();
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error.message);
      }
    };

    fetchVideos();
  }, []);

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
            Video Player App
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

      <div>
        {videos.map((video) => (
          <div className="video-item-user" key={video.id}>
            <video controls width="250" height="200">
              <source src={`${BASE_URL}/play/${video.id}`} type="video/mp4" alt="" />
            </video>
            <div className="video-details-user">
              <h3>{video.title}</h3>
              <p>{video.tags}</p>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayUsers;
