// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  const bookId = req.params.id;
  res.render('books/details', { title: 'Book Details', books: book });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  // Retrieve data from the form
  const { title, description, price, author, genre } = req.body;

  // Create a new book document using the model
  const newBook = new book({
    Title: title,
    Description: description,
    Price: price,
    Author: author,
    Genre: genre
  });

  // Save the new book to the database
  newBook.save((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/books'); // Redirect to the books list after adding a book
    }
  });
});

// GET - display the details of a book and provide an option to edit
router.get('/details/:id', (req, res, next) => {
  const bookId = req.params.id;

  // Find the book by ID in the database
  book.findById(bookId, (err, book) => {
    if (err) {
      console.error(err);
    } else {
      res.render('details', {
        title: 'Book Details',
        book: book
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {
  const bookId = req.params.id;

  // Find the book by ID and update its details
  book.findByIdAndUpdate(bookId, {
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  }, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/books'); // Redirect to the books list after updating the book
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  const bookId = req.params.id;

  // // Find the book by ID and remove it from the database
  book.findByIdAndRemove(bookId, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/books'); // Redirect to the books list after deleting the book
    }
  });
});


module.exports = router;
