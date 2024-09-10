const db = require("./../database");

const addBookadd = async (req, res) => {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS addBooks (
    addbook_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    bookname VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    tag VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    about VARCHAR(255) NOT NULL,
    status VARCHAR(255)
  );
`;

  // Data to insert
  const { author, amount, tag, url, bookname, email, user_name, about, phone, status } = req.body;
  // console.log(req.body);
  const insertUserQuery = `
    INSERT INTO addBooks (user_name, email,phone,bookname,author,amount,tag,url,about,status)
    VALUES (?, ?, ?, ?,?,?,?,?,?,?)
  `;


  // First, create the table if it doesn't exist
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.stack);
      res.status(500).send("Error creating table");
      return;
    }

    // Then, insert the new user into the table
    db.query(
      insertUserQuery,
      [user_name, email, phone, bookname, author, amount, tag, url, about, status],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err.stack);
          res.status(500).send("Error inserting user");
          return;
        }
        res.status(200).send({
          message: "book added  successfully",
        });
      }
    );
  });
}

const addBookGetall = async (req, res) => {
  const status = "fail";
  if (!status) {
    return res.status(400).json({ error: "Status parameter is required" });
  }

  let query = "SELECT * FROM addbooks";

  if (status === "fail") {
    query += " WHERE status = 'fail'";
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json({
      status: "success",
      data: {
        addbooks: results,
      },
    });
  });
};


const addBookAccept = async (req, res) => {
  const { addbook_id } = req.params;
  //   console.log(addbook_id);
  if (!addbook_id) {
    return res.status(400).json({ error: "addbook_id parameter is required" });
  }

  const updateQuery = `
    UPDATE addbooks
    SET status = 'success'
    WHERE addbook_id = ?
  `;

  db.query(updateQuery, [addbook_id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "No record found with the provided addbook_id" });
    }

    res.status(200).json({
      message: `Status updated successfully for addbook_id ${addbook_id}`,
    });
  });
};


const addBookDelete = (req, res) => {
  const { addbook_id } = req.params;
  if (!addbook_id) {
    return res
      .status(400)
      .send({ message: "error in deleting" });
  }

  const deleteReviewQuery = `
    DELETE FROM addbooks
    WHERE addbook_id = ? 
  `;

  db.query(deleteReviewQuery, [addbook_id], (err, result) => {
    if (err) {
      console.error("Error deleting addbook:", err.stack);
      res.status(500).send("Error deleting addbook");
      return;
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res.status(404).send({
        message: "no books added",
      });
    }

    res.status(200).send({ message: "book deleted successfully" });
  });
};
module.exports = { addBookDelete, addBookGetall, addBookadd, addBookAccept };



