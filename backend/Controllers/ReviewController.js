const { collectionGroup } = require("firebase/firestore");
const db = require("./../database");

const addReview = (req, res) => {
  const { user_id, book_id, review } = req.body;

  // Validate required fields
  if (!user_id || !book_id || !review) {
    return res
      .status(400)
      .send({ message: "userId, bookId, and review are required" });
  }

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS reviews (
      review_id INT AUTO_INCREMENT PRIMARY KEY,
      review TEXT,
      user_id INT,
      book_id INT,
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (book_id) REFERENCES books(book_id)
    );
  `;

  const insertReviewQuery = `
    INSERT INTO reviews (review, user_id, book_id)
    VALUES (?, ?, ?)
  `;

  // First, create the table if it doesn't exist
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.stack);
      res.status(500).send("Error creating table");
      return;
    }

    // Then, insert the review into the reviews table
    db.query(insertReviewQuery, [review, user_id, book_id], (err, result) => {
      if (err) {
        console.error("Error inserting review:", err.stack);
        res.status(500).send("Error inserting review");
        return;
      }
      res
        .status(200)
        .send({
          message: "Review added successfully",
          reviewId: result.insertId,
        });
    });
  });
};

const getAllReview= (req, res) => {
  const { bookId } = req.params;
//    console.log(bookId+"book id");
  if (!bookId) {
    return res.status(400).send({ message: "bookId parameter is required" });
  }

  const getReviewsQuery = `
    SELECT reviews.review_id, users.name,reviews.user_id ,reviews.review
    FROM reviews
    INNER JOIN users ON reviews.user_id = users.user_id
    WHERE reviews.book_id = ?
  `;

  db.query(getReviewsQuery, [bookId], (err, results) => {
    if (err) {
      console.error("Error retrieving reviews:", err.stack);
      res.status(500).send("Error retrieving reviews");
      return;
    }

    // If no reviews found for the given bookId
    if (results.length === 0) {
      return res.status(404).send({ message: "No reviews found for this book" });
    }
  

    // Map the results to desired format
    const reviews = results.map((result) => ({
      review_id: result.review_id,
      username: result.name,
      review: result.review,
      userId: result.user_id,
    }));

    res.status(200).send(reviews);
  });
};

const deletebyid = (req, res) => {
  const { userId, bookId } = req.params;
// console.log(userId + bookId);
  if (!userId || !bookId) {
    return res
      .status(400)
      .send({ message: "userId and bookId parameters are required" });
  }

  const deleteReviewQuery = `
    DELETE FROM reviews
    WHERE user_id = ? AND book_id = ?
  `;

  db.query(deleteReviewQuery, [userId, bookId], (err, result) => {
    if (err) {
      console.error("Error deleting review:", err.stack);
      res.status(500).send("Error deleting review");
      return;
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: "No review found for this user and book combination",
      });
    }

    res.status(200).send({ message: "Review deleted successfully" });
  });
};







module.exports = { getAllReview, addReview,deletebyid };