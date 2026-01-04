const express = require('express');
const app = express();
const PORT = 3000;

// Use JSON middleware
app.use(express.json());

// In-memory books data
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// Home route
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book REST API!');
});

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

// POST new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Title and Author are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (!title || !author) {
    return res.status(400).json({ error: "Title and Author are required" });
  }

  books[bookIndex] = { id: bookId, title, author };
  res.json(books[bookIndex]);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const exists = books.some(b => b.id === bookId);

  if (!exists) {
    return res.status(404).json({ error: "Book not found" });
  }

  books = books.filter(b => b.id !== bookId);
  res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
