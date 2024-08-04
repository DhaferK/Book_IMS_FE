import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import BookCard from '../../components/BookCard/BookCard';
import ChatBot from '../../components/ChatBot/ChatBot';
import { Hourglass } from 'react-loader-spinner';
import { getUserLikedBooks } from '../../services/api';
import './Gallery.css';
import chatIcon from '../../assets/chat.svg';

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

interface GalleryProps {
  token: string | null;
}

const Gallery: React.FC<GalleryProps> = ({ token }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');  
  const perPage = 12;

  useEffect(() => {
    if (token) {
      loadBooks(currentPage, searchQuery);
    }
  }, [currentPage, token, searchQuery]);

  const fetchBooks = async (page: number, search: string): Promise<Book[]> => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/books?page=${page}&per_page=${perPage}&search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch books');
      }

      let likedBooks: any[] = [];
      try {
        const likedBooksResponse = await getUserLikedBooks(token!);
        likedBooks = likedBooksResponse.books || [];
      } catch (error) {
        console.warn('No liked books found or error fetching liked books:', error);
      }

      const booksWithLikeStatus = data.books.map((book: Book) => ({
        ...book,
        isLiked: likedBooks.some((likedBook: any) => likedBook.book_id === book.book_id),
      }));

      return booksWithLikeStatus;
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Error fetching books. Please try again later.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async (page: number, search: string) => {
    const books = await fetchBooks(page, search);
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

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="gallery-page">
      <SearchBar setSearchQuery={setSearchQuery} /> 
      {loading ? (
        <div className="loader-wrapper">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#000000', '#FFFFFF']}
          />
        </div>
      ) : (
        <div className="gallery">
          {books.map(book => (
            <BookCard key={book.book_id} book={book} token={token!} />
          ))}
        </div>
      )}
      <div className="pagination">
        <button id="prevPage" onClick={prevPage} disabled={loading}>Previous</button>
        <button id="nextPage" onClick={nextPage} disabled={loading}>Next</button>
      </div>
      
      <div className="chat-icon-container" onClick={toggleChat}>
        <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
      </div>

      {chatOpen && <ChatBot />}
    </div>
  );
}

export default Gallery;
