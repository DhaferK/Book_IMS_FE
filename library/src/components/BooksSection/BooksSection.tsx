import React, { useEffect, useState } from 'react';
import './BooksSection.css';
import addIcon from '../../assets/addIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';

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
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchBooks();
    }
  }, [token]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/books?page=1&per_page=10`, {
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

      setBooks(data.books);
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

  const handleDeleteBook = (book_id: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the book with ID: ${book_id}?`);
    if (confirmDelete) {
      setBooks(books.filter(book => book.book_id !== book_id));
    }
  };

  const handleAddBook = () => {
    const newBook: Book = {
      book_id: (books.length + 1).toString(),
      title: '',
      author_name: '',
      genre: '',
      description: '',
      year: new Date().getFullYear(),
      rating: 0,
      num_pages: 0,
      ratings_count: 0,
    };
    setBooks([...books, newBook]);
    setEditingRow(newBook.book_id);
  };

  return (
    <div className="booksSection">
      <h2>Books</h2>
      <div className="tableControls">
        <button onClick={handleAddBook} className="iconButton">
          <img src={addIcon} alt="Add Book" />
        </button>
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
