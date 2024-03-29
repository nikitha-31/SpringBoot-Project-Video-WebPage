import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Your CSS file for admin login styling

const AdminLogin = () => {
  const initialAdminCredentials = {
    email: '',
    password: '',
  };

  const [adminCredentials, setAdminCredentials] = useState(initialAdminCredentials);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8010/auth/admin/login', adminCredentials)
      .then(response => {
        console.log('Admin login response:', response.data);
        if (response.data === 'Admin logged in successfully') {
          navigate('/admin/home'); // Redirect to admin dashboard upon successful login
        } else {
          console.error('Admin login failed');
          setLoginFailed(true);
          // Handle login failure (display error message or perform other actions)
        }
      })
      .catch(error => {
        console.error('Error logging in as admin: ', error);
        // Handle login failure due to network or server issues
        setLoginFailed(true);
      });
  };

  return (
    <div>
      
      

      <div className='container'>
      <form className="login-form" onSubmit={handleSubmit}>
      <center><h2>Admin Login</h2></center>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={adminCredentials.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={adminCredentials.password}
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
    </div>
  );
};

export default AdminLogin;