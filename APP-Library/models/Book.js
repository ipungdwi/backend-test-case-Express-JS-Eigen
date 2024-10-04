// models/Book.js
const db = require('../config/db');

class Book {
  static getAllBooks(callback) {
    db.query('SELECT * FROM Books', callback);
  }

  static borrowBook(memberCode, bookCode, callback) {
    db.query('INSERT INTO BorrowedBooks (memberCode, bookCode, borrowDate) VALUES (?, ?, NOW())', [memberCode, bookCode], callback);
  }

  static returnBook(memberCode, bookCode, callback) {
    db.query('DELETE FROM BorrowedBooks WHERE memberCode = ? AND bookCode = ?', [memberCode, bookCode], callback);
  }

  static checkAvailability(bookCode, callback) {
    db.query('SELECT stock FROM Books WHERE code = ?', [bookCode], callback);
  }

  static updateStock(bookCode, quantity, callback) {
    db.query('UPDATE Books SET stock = stock + ? WHERE code = ?', [quantity, bookCode], callback);
  }
}

module.exports = Book;
