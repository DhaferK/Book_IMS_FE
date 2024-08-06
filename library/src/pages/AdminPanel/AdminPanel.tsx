// AdminPanel.tsx
import React from 'react';
import BooksSection from '../../components/BooksSection/BooksSection';
import UsersSection from '../../components/UsersSection/UsersSection';
import AddBookSection from '../../components/AddBookSection/AddBookSection';
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
      <div className="sectionGap"></div> 
      <AddBookSection />  
    </div>
  );
};

export default AdminPanel;
