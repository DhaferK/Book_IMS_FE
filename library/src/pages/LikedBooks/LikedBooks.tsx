import React, { useState, useEffect } from 'react';
import { getUserLikedBooks } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';
import './LikedBooks.css';

interface Book {
  book_id: string;
  title: string;
  genre: string;
  description: string;
  year: number;
  author_id: number;
  thumbnail: string;
  rating: number;
  author_name: string;
  isLiked: boolean;
}

interface LikedBooksProps {
  token: string | null;
}

const LikedBooks: React.FC<LikedBooksProps> = ({ token }) => {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (token) {
      fetchLikedBooks();
    }
  }, [token]);

  const fetchLikedBooks = async () => {
    try {
      const response = await getUserLikedBooks(token!);
      setLikedBooks(response.books.map((book: Book) => ({ ...book, isLiked: true })));
    } catch (error) {
      console.error('Failed to fetch liked books', error);
    }
  };

  const handleUnlike = (bookId: string) => {
    setLikedBooks(prevBooks => prevBooks.filter(book => book.book_id !== bookId));
  };

  return (
    <div className="liked-books-page">
      <h1>Liked Books</h1>
      <div className="liked-books-gallery">
        {likedBooks.length > 0 ? (
          likedBooks.map(book => (
            <BookCard key={book.book_id} book={book} token={token!} onUnlike={handleUnlike} />
          ))
        ) : (
          <p>No liked books found.</p>
        )}
      </div>
    </div>
  );
}

export default LikedBooks;
