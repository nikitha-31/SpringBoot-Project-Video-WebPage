import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddVideo.css';
import { SaveVideoInfo, UplaodVideo } from '../../urls/videoService';

const AddVideo = () => {
  const [video, setVideo] = useState({
    title: '',
    tags: '',
    description: '',
  });
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleProgress, setSingleProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setSingleProgress(percentage);
    },
  };

  const fieldChangeHandle = (event) => {
    setVideo({ ...video, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    setVideos(event.target.files[0]);
  };

  const createVideo = (event) => {
    event.preventDefault();
    if (video.title.trim() === '' || video.description.trim() === '') {
      toast.error('Please enter title and description');
      return;
    }

    // Assume SaveVideoInfo and UplaodVideo functions are correctly defined
    SaveVideoInfo(video)
      .then((data) => {
        UplaodVideo(videos, data.id, singleFileOptions)
          .then(() => {
            setLoading(true);
            setShowModal(true);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(() => {
        alert('Upload failed');
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVideo({
      title: '',
      description: '',
      tags: '',
    });
  };

  const goBack = () => {
    navigate(-1); // Navigate to the previous page
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
            <button onClick={goBack} className="button-logout">
              Back
            </button>
          </div>
        </div>
      </nav>

      <br />
      <br />
      <h3 style={{ textAlign: 'center', color: '#333', width: '50%', margin: '0 auto' }}>
        Upload Video
      </h3>
      <form onSubmit={createVideo}>
        <div>
          <label htmlFor='title'>Video Title</label>
          <input
            type='text'
            id='title'
            placeholder='Enter title here'
            name='title'
            onChange={fieldChangeHandle}
          />
        </div>
        <div>
          <label htmlFor='tags'>Video Tags</label>
          <input
            type='text'
            id='tags'
            placeholder='Mention tags'
            name='tags'
            onChange={fieldChangeHandle}
          />
        </div>
        <div>
          <label htmlFor='description'>Video Description</label>
          <input
            type='text'
            id='description'
            placeholder='Mention description'
            name='description'
            onChange={fieldChangeHandle}
          />
        </div>
        <div>
          <label htmlFor='video'>Select video to post</label>
          <input id='videoName' type='file' onChange={handleFileChange} />
        </div>
        <div>
          <button type='submit'>Upload Video</button>
        </div>
      </form>

      {showModal && (
        <div className="modal-container show">
          <div className="modal-content">
            <div>Video uploaded successfully!</div>
            <button className="close-button" type='button' onClick={handleCloseModal}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVideo;
