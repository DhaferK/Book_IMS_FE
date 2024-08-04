// App.tsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Gallery from './pages/Gallery/Gallery';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import Profile from './pages/Profile/Profile';
import LikedBooks from './pages/LikedBooks/LikedBooks'; // Import LikedBooks page
import { getUserProfile } from './services/api';
import './App.css';
import './fonts.css';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const data = await getUserProfile(token);
          setUserProfile(data.user);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
          setToken(null);
          setUserProfile(null);
          localStorage.removeItem('token');
          navigate('/login');
        }
      };
      fetchUserProfile();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserProfile(null);
  };

  return (
    <div className="container">
      <Navbar userProfile={userProfile} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginRegister setToken={setToken} />} />
        <Route path="/gallery" element={<Gallery token={token} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path='/profile' element={<Profile token={token}/>} />
        <Route path="/liked" element={<LikedBooks token={token!} />} /> {/* Add route */}
        <Route path="/" element={<LoginRegister setToken={setToken} />} /> 
      </Routes>
    </div>
  );
};

export default App;
