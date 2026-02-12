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
const favicon = require('serve-favicon')

// if we cant open the data file, we'll statically set a json object
// we set this static content to nil initially, and set as required within open and write handlers
let content = null

// Apply request logging middleware
app.use(requestLogger);
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
  res.send(`${data_path} ${PORT}`);
});

// GET all books
app.get('/books', (req, res) => {
    res.type('json').send(JSON.stringify(load_json_file(data_path), null, 2));
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  const books = load_json_file(data_path);

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.type('json').send(JSON.stringify(book, null, 2));
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

  res.status(201).type('json').send(JSON.stringify(newBook));
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

  res.type('json').send(JSON.stringify(books[bookIndex]), null, 2);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const exists = books.some(b => b.id === bookId);

  if (!exists) {
    return res.status(404).json({ error: "Book not found" });
  }

  const books = load_json_file(data_path);

  books.filter(b => b.id !== bookId);

  write_json_file(books, data_path)

  res.type('json').send(JSON.stringify({ message: "Book deleted successfully" }, null, 2));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT} #{Build.BuildNumber}# ${data_path}`);
});

function load_json_file(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      console.log('could not load data');
      if (content != null) {
        console.log('content has data, return untouched')
        return content
      } else {
        console.log('statically setting content');
        content = [
          { id: 1, title: "Atomic Habits"  , author: "James Clear" },
          { id: 2, title: "The Alchemist"  , author: "Paulo Coelho" }
        ]
        return content;
      }
    } else {
      console.log("some other error");
      throw err;
    }
  }
}

function write_json_file(json, filepath) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(json, null, 2));
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      console.log('failed to write data');
    } else {
      console.log('some other error');
      throw err;
    }
  }
}