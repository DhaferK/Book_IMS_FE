import React from 'react';

function BookCard({ book }) {
  return (
    <div className="book">
      <div className="cover-photo">
        <img src={book.thumbnail} alt={book.title} />
      </div>
      <p className="book-title">{book.title}</p>
    </div>
  );
}

export default BookCard;
