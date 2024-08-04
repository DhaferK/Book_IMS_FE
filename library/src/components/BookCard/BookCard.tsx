import React, { useState } from 'react';
import './BookCard.css';
import LikeButton from '../LikeButton/LikeButton';
import StarRating from '../StarRating/StarRating';

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

interface BookCardProps {
  book: Book;
  token: string;
  onUnlike?: (bookId: string) => void; 
}

const BookCard: React.FC<BookCardProps> = ({ book, token, onUnlike }) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.likeButton')) {
      setFlipped(!flipped);
    }
  };

  return (
    <div className={`bookCard ${flipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="bookCardInner">
        <div className="bookCardFront">
          <LikeButton token={token} bookId={book.book_id} isLiked={book.isLiked} onUnlike={onUnlike} />
          <div className="bookHeader">
            <p className="bookTitle headline-small" title={book.title}>{book.title}</p>
            <div className="bookInfo">
              <p className="bookAuthor body-medium">{book.author_name}</p>
              <p className="bookYear body-medium">{book.year}</p>
            </div>
          </div>
          <div className="coverPhoto">
            <img src={book.thumbnail} alt={book.title} />
          </div>
          <div className="bookFooter">
            <p className="bookGenre body-medium">{book.genre}</p>
            <StarRating rating={book.rating} />
          </div>
        </div>
        <div className="bookCardBack">
          <h2>{book.title}</h2>
          <div className="bookDescription">
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
