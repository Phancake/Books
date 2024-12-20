import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (err) { 
      console.log(err)
    }
  }
  const addBook = async () => {
    const bookData = {
      title: title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/add/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
}

  return (
    <>
      <h1> Book Website</h1>

      <div>
        <input type="text" placeholder="Book Title..." onChange={(e) => setTitle(e.target.value)}/>
        <input type="number" placeholder="Release Year..." onChange={(e) => setReleaseYear(parseInt(e.target.value))}/>
        <button onClick={addBook}>Add Book</button>
      </div>
      {books.map((book) => {
        return (
      <div key={book.id}>
        <p>Title: {book.title}</p>
        <p>Release Year: {book.release_year}</p>
      </div>
        );
      })}
    </>
  )
}

export default App
