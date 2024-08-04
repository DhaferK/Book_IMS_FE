import React, { useState, useEffect } from 'react';
import Navbar from '../../../../library/src/components/Navbar/Navbar';
import SearchBar from '../../../../library/src/components/SearchBar/SearchBar';
import BookCard from '../../../../library/src/components/BookCard/BookCard';
import { Button } from "@chakra-ui/react";
import { Hourglass } from 'react-loader-spinner';
import './Gallery.css';

const token = "your-token-here";

interface Book {
  id: string;
  title: string;
  genre: string;
  description: string;
  year: number;
  author_id: number;
  thumbnail: string;
  rating: number;
  author_name: string;
}

const Gallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const perPage = 12;

  useEffect(() => {
    loadBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = async (page: number): Promise<Book[]> => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/books?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch books');
      }
      return data.books;
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Error fetching books. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async (page: number) => {
    const books = await fetchBooks(page);
    if (books) {
      setBooks(books);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container">
      <Navbar />
      <SearchBar />
      {loading ? (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#000000', '#FFFFFF']}
        />
      ) : (
        <div id="gallery" className="gallery">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
      <div className="pagination">
        <Button id="prevPage" onClick={prevPage} disabled={loading}>Previous</Button>
        <Button id="nextPage" onClick={nextPage} disabled={loading}>Next</Button>
      </div>
    </div>
  );
};

export default Gallery;
