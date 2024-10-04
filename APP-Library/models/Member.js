const db = require('../config/db');

class Member {
  static getAllMembers(callback) {
    db.query('SELECT * FROM Members', callback);
  }

  static getBorrowedCount(memberCode, callback) {
    db.query('SELECT COUNT(*) AS borrowedCount FROM BorrowedBooks WHERE memberCode = ?', [memberCode], callback);
  }

  static checkPenalty(memberCode, callback) {
    db.query('SELECT penalty FROM members WHERE code = ?', [memberCode], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static penalizeMember(memberCode, callback) {
    db.query('UPDATE Members SET penalty = 1 WHERE code = ?', [memberCode], callback);
  }

  static clearPenalty(memberCode, callback) {
    db.query('UPDATE Members SET penalty = 0 WHERE code = ?', [memberCode], callback);
  }
}

module.exports = Member;
