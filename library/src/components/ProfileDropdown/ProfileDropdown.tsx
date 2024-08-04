// ProfileDropdown.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userIcon from '../../assets/usericon.svg';
import logoutIcon from '../../assets/logout.svg';
import profileIcon from '../../assets/profileIcon.svg';
import panelIcon from '../../assets/panelIcon.svg';
import './ProfileDropdown.css';

interface ProfileDropdownProps {
  userProfile: { role: string } | null;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userProfile, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login'); 
  };

  return (
    <div className="profile-dropdown">
      <img src={userIcon} alt="User Icon" className="user-icon" onClick={toggleDropdown} />
      {dropdownOpen && (
        <ul className="dropdown-menu">
          {!userProfile ? (
            <li>
              <Link to="/login">
                <img src={logoutIcon} alt="Login Icon" className="menu-icon" />
                <span>Login/Signup</span>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/profile">
                  <img src={profileIcon} alt="Profile Icon" className="menu-icon" />
                  <span>Profile</span>
                </Link>
              </li>
              {userProfile.role == '1' && (
                <li>
                  <Link to="/admin">
                    <img src={panelIcon} alt="Admin Panel Icon" className="menu-icon" />
                    <span>Admin Panel</span>
                  </Link>
                </li>
              )}
              <li className="logout" onClick={handleLogoutClick}>
                <img src={logoutIcon} alt="Logout Icon" className="menu-icon" />
                <span>Logout</span>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
