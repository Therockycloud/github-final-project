const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const booksUrl = () => {
  const port = process.env.PORT || 5000;
  return `http://localhost:${port}/books-data`;
};

public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required."});
  }

  if (isValid(username)) {
    return res.status(409).json({message: "User already exists."});
  }

  users.push({username, password});
  return res.status(201).json({message: "User successfully registered. You can now login."});
});

public_users.get('/books-data', function (req, res) {
  return res.status(200).json(books);
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get(booksUrl());
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({message: "Unable to retrieve books."});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const response = await axios.get(booksUrl());
    const allBooks = response.data;
    const book = allBooks[req.params.isbn];

    if (!book) {
      return res.status(404).json({message: "Book not found."});
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({message: "Unable to retrieve book."});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  try {
    const response = await axios.get(booksUrl());
    const allBooks = response.data;
    const author = req.params.author.toLowerCase();
    const matchedBooks = Object.fromEntries(
      Object.entries(allBooks).filter(([, book]) => book.author.toLowerCase().includes(author))
    );

    if (!Object.keys(matchedBooks).length) {
      return res.status(404).json({message: "No books found for this author."});
    }

    return res.status(200).json(matchedBooks);
  } catch (error) {
    return res.status(500).json({message: "Unable to retrieve books by author."});
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  try {
    const response = await axios.get(booksUrl());
    const allBooks = response.data;
    const title = req.params.title.toLowerCase();
    const matchedBooks = Object.fromEntries(
      Object.entries(allBooks).filter(([, book]) => book.title.toLowerCase().includes(title))
    );

    if (!Object.keys(matchedBooks).length) {
      return res.status(404).json({message: "No books found for this title."});
    }

    return res.status(200).json(matchedBooks);
  } catch (error) {
    return res.status(500).json({message: "Unable to retrieve books by title."});
  }
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
  try {
    const response = await axios.get(booksUrl());
    const allBooks = response.data;
    const book = allBooks[req.params.isbn];

    if (!book) {
      return res.status(404).json({message: "Book not found."});
    }

    return res.status(200).json(book.reviews);
  } catch (error) {
    return res.status(500).json({message: "Unable to retrieve reviews."});
  }
});

module.exports.general = public_users;
