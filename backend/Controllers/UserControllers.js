const db = require("./../database");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const secret = "your_secret_key";

const createTableAndInsertUser = (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password varchar(255) not null,
      address VARCHAR(255),
      phone VARCHAR(255),
      orderId int,
      paymentId int
    );
  `;

  // Data to insert
  const { name, email, password, address, phone, orderId, paymentId } =
    req.body;

  const insertUserQuery = `
    INSERT INTO users (name, email, password,address, phone, orderId, paymentId)
    VALUES (?, ?, ?, ?, ?, ?,?)
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
      [name, email, password, address, phone, orderId, paymentId],
      (err, result) => {
        if (err) {
          console.error("Error inserting user:", err.stack);
          res.status(500).send("Error inserting user");
          return;
        }
        res.status(200).send("User inserted successfully");
      }
    );
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("hi");
  // Query the database to verify user credentials
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      // console.log(results);

      // Check if user exists and password matches
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = results[0];
      const token = jwt.sign(
        { id: user.user_id, username: user.username },
        secret,
        {
          expiresIn: "10d",
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          user,
          token,
        },
      });
    }
  );
};

module.exports = { createTableAndInsertUser, login };
