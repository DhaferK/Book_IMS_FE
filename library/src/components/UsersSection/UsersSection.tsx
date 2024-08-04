import React, { useEffect, useState } from 'react';
import './UsersSection.css';
import deleteIcon from '../../assets/deleteIcon.svg';
import userIcon from '../../assets/usericon.svg';
import { getAllUsers, deleteUser } from '../../services/api'; 

interface User {
  email: string;
  fname: string;
  lname: string;
  role: string;
}

const UsersSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const usersList = await getAllUsers(token!);
      setUsers(usersList);
      setFilteredUsers(usersList);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleDeleteUser = async (email: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the user: ${email}?`);
    if (confirmDelete) {
      try {
        await deleteUser(email, token!);
        setUsers(users.filter(user => user.email !== email));
        setFilteredUsers(filteredUsers.filter(user => user.email !== email));
      } catch (error) {
        console.error('Failed to delete user', error);
        alert('Error deleting user. Please try again.');
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchValue) ||
      user.fname.toLowerCase().includes(searchValue) ||
      user.lname.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="usersSection">
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search users by name or email"
        value={searchTerm}
        onChange={handleSearchChange}
        className="searchInput"
      />
      <ul className="userList">
        {filteredUsers.map((user) => (
          <li key={user.email} className="userItem">
            <img src={userIcon} alt="User" className="userIcon" />
            <span>{user.fname} {user.lname} ({user.email})</span>
            <span className="userRole">{user.role == '1' ? 'Admin' : 'User'}</span>
            <img 
              src={deleteIcon} 
              alt="Delete" 
              className="deleteIcon" 
              onClick={() => handleDeleteUser(user.email)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersSection;
