import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../urls/baseurl";
import { GetAllVideos, DeletePostService } from "../../urls/videoService";
import './DisplayVideo.css'
const DisplayVideo = () => {
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await DeletePostService(id);
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
      } catch (error) {
        console.error("Error deleting video:", error.message);
      }
    }
  };

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
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
            <button onClick={goBack} className="button-logout">
              Back
            </button>
          </div>
        </div>
      </nav>

      <div>
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <video controls width="250" height="200">
              <source src={`${BASE_URL}/play/${video.id}`} type="video/mp4" alt="" />
            </video>
            <div className="video-details">
              <h3>{video.title}</h3>
              <p>{video.tags}</p>
              <p>{video.description}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(video.id)}>
              Delete
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayVideo;