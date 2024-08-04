// Navbar.tsx
import React from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.svg';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

interface NavbarProps {
  userProfile: { role: string } | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userProfile, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={Logo} alt="Logo" className="logo" />
        <ProfileDropdown userProfile={userProfile} onLogout={onLogout} />
      </div>
    </nav>
  );
};

export default Navbar;
