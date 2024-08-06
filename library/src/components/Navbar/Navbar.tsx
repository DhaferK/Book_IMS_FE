import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/logo.svg';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

interface NavbarProps {
  userProfile: { role: string } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userProfile, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/gallery'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={Logo} alt="Logo" className="logo" onClick={handleLogoClick} />
        <ProfileDropdown userProfile={userProfile} onLogout={onLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
