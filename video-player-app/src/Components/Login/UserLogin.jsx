import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const UserLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8010/auth/user/login', loginData)
      .then(response => {
        console.log('Login status:', response.data);
        if (response.data === 'User logged in successfully') {
          navigate(`/display-users-videos`); // Redirect to user page
        } else {
          console.error('Login failed');
          setLoginFailed(true);
          // Handle login failure - display error message or take appropriate action
        }
      })
      .catch(error => {
        console.error('Error logging in: ', error);
        // Handle login failure due to network or server issues
        setLoginFailed(true);
      });
  };

  return (
    <div>
      

      <form className="login-form" onSubmit={handleSubmit}>
      <center><h2>Login</h2></center>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <center><button type="submit">Login</button></center>
        {loginFailed && (
          <div className="login-failed-message">
            <p style={{ fontWeight: 'bold', color: 'black',textAlign:'center' }}>Invalid Credentials.. Try Again..!!</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserLogin;