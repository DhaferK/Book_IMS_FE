import React, { useState } from 'react';
import './AddBookSection.css';
import { addBook } from '../../services/api';

const AddBookSection: React.FC = () => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const token = localStorage.getItem('token'); 

  const handleAddBook = async () => {
    if (!token) {
      alert('You are not authenticated!');
      return;
    }

    try {
      const bookData = {
        title,
        author_name: authorName,
        genre,
        description,
        year: parseInt(year, 10),
        rating: parseFloat(rating),
        thumbnail,
      };

      const response = await addBook(bookData, token);
      alert(`Book added successfully! Book ID: ${response.book_id}`);

      setTitle('');
      setAuthorName('');
      setGenre('');
      setDescription('');
      setYear('');
      setRating('');
      setThumbnail('');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="addBookSection">
      <h2>Add New Book</h2>
      <div className="addBookForm">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
    </div>
  );
};

export default AddBookSection;
