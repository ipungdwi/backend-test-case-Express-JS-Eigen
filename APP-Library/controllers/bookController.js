const db = require('../config/db');
const Book = require('../models/Book');
const Member = require('../models/Member');

// Get all books from the database
exports.getAllBooks = (req, res) => {
  Book.getAllBooks((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.borrowBook = (req, res) => {
  const { memberCode, bookCode } = req.body;

  // Cek apakah anggota sedang dalam penalti
  Member.checkPenalty(memberCode, (err, penaltyResults) => {
    if (err) return res.status(500).json({ error: err.message });

    // Cek penalty members
    if (penaltyResults.length > 0 && penaltyResults[0].penalty === 1) {
      return res.status(403).json({ message: 'You are currently penalized and cannot borrow books.' });
    }

    // Cek jumlah buku yang sudah dipinjam
    Member.getBorrowedCount(memberCode, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results[0].borrowedCount >= 2) {
        return res.status(403).json({ message: 'Cannot borrow more than 2 books.' });
      }

      // Cek ketersediaan buku
      Book.checkAvailability(bookCode, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (results.length === 0 || results[0].stock === 0) {
          return res.status(404).json({ message: 'Book not available.' });
        }

        // Pinjam buku
        Book.borrowBook(memberCode, bookCode, (err) => {
          if (err) return res.status(500).json({ error: err.message });

          // Kurangi stok buku
          Book.updateStock(bookCode, -1, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Book borrowed successfully.' });
          });
        });
      });
    });
  });
};


exports.returnBook = (req, res) => {
  const { memberCode, bookCode } = req.body;

  // Check if the member has borrowed the book
  db.query('SELECT borrowDate FROM BorrowedBooks WHERE memberCode = ? AND bookCode = ?', [memberCode, bookCode], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'This book was not borrowed by the member.' });

    const borrowDate = new Date(results[0].borrowDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - borrowDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Return the book
    Book.returnBook(memberCode, bookCode, (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // Increase the stock of the book
      Book.updateStock(bookCode, 1, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Book returned successfully.' });

        // Check for penalty
        if (diffDays > 7) {
          Member.penalizeMember(memberCode, (err) => {
            if (err) console.error('Error updating penalty:', err);
            // Set a timer for 3 days before allowing to borrow again
            setTimeout(() => {
              Member.clearPenalty(memberCode, (err) => {
                if (err) console.error('Error removing penalty:', err);
              });
            }, 3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
          });
        }
      });
    });
  });
};