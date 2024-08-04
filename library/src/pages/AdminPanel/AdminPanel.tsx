import React from 'react';
import BooksSection from '../../components/BooksSection/BooksSection';
import UsersSection from '../../components/UsersSection/UsersSection';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  return (
    <div className="adminPanelContainer">
      <h1 className="adminPanelTitle">Admin Panel</h1>
      <div className="adminContent">
        <BooksSection />
        <div className="sectionGap"></div> 
        <UsersSection />
      </div>
    </div>
  );
};

export default AdminPanel;
