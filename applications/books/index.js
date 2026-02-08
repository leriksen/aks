const express = require('express');
const app = express();

require('dotenv').config();
const PORT = parseInt(process.env.PORT) || 3000;

const winston = require("winston");
const logger = winston.createLogger(
    {
        level: "info",
        format: winston.format.json(),
        defaultMeta: {
            service: 'books'
        },
        transports: [
            new winston.transports.Console(),
            new winston.transports.File(
                {
                    filename: "logs/app.log" }
            ),
        ],
    }
);

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`); // Log the HTTP method and URL
    next();
};

const fs = require('fs');
const path = require('path'); // To resolve file paths

const data_path = process.env.DATAPATH || path.join('/', 'data', 'books', 'books.json');

// Apply request logging middleware
app.use(requestLogger);

const favicon = require('serve-favicon')

// Use favicon middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Use JSON middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send(`📚 Welcome to the Book REST API! #{Build.BuildNumber}# ${PORT} ${data_path}`);
});

// Version route
app.get('/version', (req, res) => {
  res.send('#{Build.BuildNumber}#');
});

// Ports route
app.get('/debug', (req, res) => {
  res.send('#{DATA_PATH}# #{PORT}# ');
});
// GET all books
app.get('/books', (req, res) => {
    res.json(load_json_file(data_path));
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  const books = load_json_file(data_path);

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

  const books = load_json_file(data_path);

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);

  write_json_file(books, data_path)

  res.status(201).json(newBook);
});

// PUT update book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const books = load_json_file(data_path);

  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (!title || !author) {
    return res.status(400).json({ error: "Title and Author are required" });
  }

  books[bookIndex] = { id: bookId, title, author };

  write_json_file(books, data_path)

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

  write_json_file(books, data_path)

  res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT} #{Build.BuildNumber}# ${data_path}`);
});

function load_json_file(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(content);
}

function write_json_file(json, filepath) {
    fs.writeFileSync(filepath, JSON.stringify(json, null, 2));
}