// Profile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, resetUserPassword } from '../../services/api';
import userIcon from '../../assets/usericon.svg';
import './Profile.css';

interface ProfileProps {
  token: string | null;
}

const Profile: React.FC<ProfileProps> = ({ token }) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [resetPasswordVisible, setResetPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const data = await getUserProfile(token);
          setUserProfile(data.user);
          setFirstName(data.user.fname);
          setLastName(data.user.lname);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      };
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleProfileUpdate = async () => {
    if (!token) return;
  
    try {
      await updateUserProfile(token, { fname: firstName, lname: lastName });

      setUserProfile((prevProfile: any) => ({
        ...prevProfile,
        fname: firstName,
        lname: lastName,
      }));
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  

  const handlePasswordReset = async () => {
    if (!token || !newPassword || newPassword !== confirmPassword) {
      alert('Please make sure passwords match and are valid.');
      return;
    }

    try {
      await resetUserPassword(token, oldPassword, newPassword);
      alert('Password reset successfully!');
      setResetPasswordVisible(false);
    } catch (error) {
      console.error('Failed to reset password', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-dashboard">
      <div className="profile-sidebar">
        <img src={userIcon} alt="User Icon" className="profile-user-icon" />
        <p>{userProfile.email}</p>
        <p>{userProfile.role == '1' ? 'Admin' : 'User'}</p>
      </div>
      <div className="profile-content">
        <h1>My Profile</h1>
        <div className="profile-edit">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="profile-edit">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <button className="update-button" onClick={handleProfileUpdate}>
            Update Profile
          </button>
          <button
            className="reset-password-button"
            onClick={() => setResetPasswordVisible(!resetPasswordVisible)}
          >
            Reset Password
          </button>
        </div>
        {resetPasswordVisible && (
          <div className="reset-password-fields">
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <button className="confirm-reset-button" onClick={handlePasswordReset}>
              Confirm Password Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
