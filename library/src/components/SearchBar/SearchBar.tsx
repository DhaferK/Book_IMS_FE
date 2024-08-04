import React, { useState } from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search.svg';
import filterIcon from '../../assets/filter.svg';
import likeIcon from '../../assets/like.svg';

interface SearchBarProps {
  setSearchQuery: (query: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSearchQuery(newQuery); 
  };

  const handleLikeIconClick = () => {
    navigate('/liked'); 
  };

  return (
    <div className="search-bar">
      <img src={searchIcon} className="searchIcon" alt="searchIcon" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type book title/genre/name of author"
      />
      <img src={filterIcon} className="filterIcon" alt="filterIcon" />
      <div className="gap"></div>
      <img 
        src={likeIcon} 
        className="likeIcon" 
        alt="likeIcon" 
        onClick={handleLikeIconClick} 
      />
    </div>
  );
};

export default SearchBar;
