import React, { useEffect, useState } from 'react';
import './BooksSection.css';
import deleteIcon from '../../assets/deleteIcon.svg';
import { fetchBooks, deleteBook } from '../../services/api'; 

interface Book {
  book_id: string;
  title: string;
  author_name: string;
  genre: string;
  description: string;
  year: number;
  rating: number;
  num_pages: number;
  ratings_count: number;
}

const BooksSection: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      loadBooks();
    }
  }, [token, searchQuery]);  

  const loadBooks = async () => {
    setLoading(true);
    try {
      const books = await fetchBooks(token!, 1, 10, searchQuery);
      setBooks(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Error fetching books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (book_id: string) => {
    setEditingRow(book_id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, book_id: string, field: keyof Book) => {
    const updatedBooks = books.map(book => {
      if (book.book_id === book_id) {
        return { ...book, [field]: e.target.value };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const handleSaveClick = () => {
    setEditingRow(null);
  };

  const handleDeleteBook = async (book_id: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the book with ID: ${book_id}?`);
    if (confirmDelete) {
      try {
        await deleteBook(book_id, token!);
        setBooks(books.filter(book => book.book_id !== book_id));
        alert('Book deleted successfully');
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again later.');
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="booksSection">
      <h2>Books</h2>
      <div className="tableControls">
        <input
          type="text"
          placeholder="Search by title, author, genre, or ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="searchInput"
        />
      </div>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="booksTable">
          <thead>
            <tr>
              <th></th>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Rating</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.book_id}>
                <td>
                  {editingRow === book.book_id ? (
                    <button className="saveBtn" onClick={handleSaveClick}>Save</button>
                  ) : (
                    <button className="editBtn" onClick={() => handleEditClick(book.book_id)}>✎</button>
                  )}
                </td>
                <td>{book.book_id}</td>
                <td>
                  {editingRow === book.book_id ? (
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => handleInputChange(e, book.book_id, 'title')}
                    />
                  ) : (
                    book.title
                  )}
                </td>
                <td>
                  {editingRow === book.book_id ? (
                    <input
                      type="text"
                      value={book.author_name}
                      onChange={(e) => handleInputChange(e, book.book_id, 'author_name')}
                    />
                  ) : (
                    book.author_name
                  )}
                </td>
                <td>
                  {editingRow === book.book_id ? (
                    <input
                      type="text"
                      value={book.genre}
                      onChange={(e) => handleInputChange(e, book.book_id, 'genre')}
                    />
                  ) : (
                    book.genre
                  )}
                </td>
                <td>
                  {editingRow === book.book_id ? (
                    <input
                      type="number"
                      value={book.year}
                      onChange={(e) => handleInputChange(e, book.book_id, 'year')}
                    />
                  ) : (
                    book.year
                  )}
                </td>
                <td>
                  {editingRow === book.book_id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={book.rating}
                      onChange={(e) => handleInputChange(e, book.book_id, 'rating')}
                    />
                  ) : (
                    book.rating
                  )}
                </td>
                <td className="descriptionCell">
                  {editingRow === book.book_id ? (
                    <input
                      type="text"
                      value={book.description}
                      onChange={(e) => handleInputChange(e, book.book_id, 'description')}
                    />
                  ) : (
                    book.description
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteBook(book.book_id)} className="iconButton">
                    <img src={deleteIcon} alt="Delete Book" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BooksSection;
