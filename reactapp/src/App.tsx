import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from '../../library/src/components/Navbar/Navbar';
import SearchBar from '../../library/src/components/SearchBar/SearchBar';
import Gallery from '../../library/src/components/Gallery/Gallery';
import { Button } from "@chakra-ui/react";
import { Hourglass } from 'react-loader-spinner';
import './/fonts.css';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiZW1haWwiOiJyb2dvQHJvZ28uY29tIiwiZm5hbWUiOiJybyIsImxuYW1lIjoiZ28iLCJyb2xlIjoxLCJwYXNzd29yZCI6IjFmOGMxNzk3ODlkOTQyNTkzMmVmZmFlMzdlYjI2NjM1MDQ1Yjg1NjljYTM5M2Y1MmRhYThkMGFkNzQzZDMwMjEifSwiZXhwIjoxNzIyMzQ0ODIxfQ.CgNQl33L2dg_R7mcXWci3IDMjb1f8fYWmwZ403fB5Vc";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const perPage = 12;

  useEffect(() => {
    loadBooks(currentPage);
  }, [currentPage]);

  async function fetchBooks(page) {
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
  }

  async function loadBooks(page) {
    const books = await fetchBooks(page);
    if (books) {
      setBooks(books);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

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
        <Gallery books={books} />
      )}
      <div className="pagination">
        <Button id="prevPage" onClick={prevPage} disabled={loading}>Previous</Button>
        <Button id="nextPage" onClick={nextPage} disabled={loading}>Next</Button>
      </div>
    </div>
  );
}

export default App;
