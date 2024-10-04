const Member = require('../models/Member');

exports.getAllMembers = (req, res) => {
  Member.getAllMembers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const membersWithCounts = results.map(member => ({
      ...member,
      borrowedCount: 0 // Default borrowed count
    }));

    // Count borrowed books for each member
    const queries = membersWithCounts.map(member => {
      return new Promise((resolve, reject) => {
        Member.getBorrowedCount(member.code, (err, countResult) => {
          if (err) return reject(err);
          member.borrowedCount = countResult[0].borrowedCount;
          resolve();
        });
      });
    });

    Promise.all(queries)
      .then(() => res.json(membersWithCounts))
      .catch(err => res.status(500).json({ error: err.message }));
  });
};
