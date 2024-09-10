const db = require("./../database");

const addPayment = (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS payments (
      payment_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id int not null,
      paymenturl varchar(255),
    );
  `;

  // Data to insert
  const { user_id,paymenturl } = req.body;

  const insertUserQuery = `
    INSERT INTO payments (user_id,book_id)
    VALUES (?,?)
  `;

  // First, create the table if it doesn't exist
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.stack);
      res.status(500).send("Error creating table");
      return;
    }

    // Then, insert the new user into the table
    db.query(insertUserQuery, [user_id, book_id], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err.stack);
        res.status(500).send("Error inserting user");
        return;
      }
      res.status(200).send({
        message: "payment   successfully",
      });
    });
  });
};

const paymentByUserId = async (req, res) => {
  const userId = req.userId;
  //   console.log(req.user);
  await db.query(
    "SELECT * FROM payments WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.status(200).json({
        status: "success",
        data: {
          payments: results,
        },
      });
    }
  );
};

module.exports = { paymentByUserId, addPayment };
