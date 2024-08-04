import React, { useState } from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search.svg';
import filterIcon from '../../assets/filter.svg';
import likeIcon from '../../assets/like.svg';

interface SearchBarProps {
  setSearchQuery: (query: string) => void; 
  setSortBy: (sortBy: string) => void;  
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery, setSortBy }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);  
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSearchQuery(newQuery); 
  };

  const handleLikeIconClick = () => {
    navigate('/liked'); 
  };

  const handleFilterClick = () => {
    setShowDropdown(!showDropdown);  
  };

  const handleFilterOptionClick = (option: string) => {
    setSortBy(option);  
    setShowDropdown(false);  
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
      <div className="filter-container">
        <img src={filterIcon} className="filterIcon" alt="filterIcon" onClick={handleFilterClick} />
        {showDropdown && (
          <div className="filter-dropdown">
            <ul>
              <li onClick={() => handleFilterOptionClick('most_trending')}>Most Trending</li>
              <li onClick={() => handleFilterOptionClick('recently_added')}>Recently Added</li>
              <li onClick={() => handleFilterOptionClick('recommended')}>Recommended</li>
              <li onClick={() => handleFilterOptionClick('most_recent_publish_year')}>Most Recent Publish Year</li>
              <li onClick={() => handleFilterOptionClick('earliest_publish_year')}>Earliest Publish Year</li>
              <li onClick={() => handleFilterOptionClick('top_rated')}>Top Rated</li>
              <li onClick={() => handleFilterOptionClick('least_rated')}>Least Rated</li>
            </ul>
          </div>
        )}
      </div>
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
