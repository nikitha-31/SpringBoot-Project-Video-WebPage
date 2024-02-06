// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Home from './Components/HomeCom/Home';
import AddVideo from './Components/AddVideosCom/AddVideo';
import DisplayVideos from './Components/DisplayVideosCom/DisplayVideos';

import DisplayUsers from './Components/UsersDisplay/DisplayUsers';
import HomeUI from './Components/HomeUI/HomeUI';
import AdminLogin from './Components/Login/AdminLogin';
import UserLogin from './Components/Login/UserLogin';
function App() {
  return (
    <Router>
      <Routes>

      <Route path='/' element={<HomeUI/>}/>
      <Route path='/login/admin' element={<AdminLogin />} />
      <Route path='/login/user' element={<UserLogin />} /> 
      <Route path='/admin/home' element={<Home/>}/>
      <Route path="/add-video" element={<AddVideo/>} />
      <Route path="/display-videos" element={<DisplayVideos/>} />
      <Route path="/display-users-videos" element={<DisplayUsers/>} />
      </Routes>
    </Router>
  );
}

export default App;
