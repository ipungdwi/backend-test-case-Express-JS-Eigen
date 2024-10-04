const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Borrow a book
router.post('/borrow', bookController.borrowBook);

// Return a book
router.post('/return', bookController.returnBook);

// Get all books
router.get('/', bookController.getAllBooks);

module.exports = router;
