const db = require("./../database");

const addOrder = (req, res) => {
  const { bookName, userId, quantity = 1, amount, paymenturl } = req.body;

  if (!bookName || !userId || !amount) {
    return res
      .status(400)
      .send({ message: "bookName, userId, and amount are required" });
  }

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
      orderId INT AUTO_INCREMENT PRIMARY KEY,
      bookName VARCHAR(50),
      userId INT,
      quantity INT DEFAULT 1,
      amount DECIMAL(10, 2),
      paymenturl varchar(255) not null,
      status VARCHAR(50) DEFAULT 'paid'
    );
  `;

  const insertOrderQuery = `
    INSERT INTO orders (bookName, userId, quantity, amount, status,paymenturl)
    VALUES (?, ?, ?, ?,'paid',?)
  `;

  // First, create the table if it doesn't exist
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.stack);
      res.status(500).send("Error creating table");
      return;
    }

    // Then, insert the new order into the table
    db.query(
      insertOrderQuery,
      [bookName, userId, quantity, amount, paymenturl],
      (err, result) => {
        if (err) {
          console.error("Error inserting order:", err.stack);
          res.status(500).send("Error inserting order");
          return;
        }
        res.status(200).send({
          message: "Order added successfully",
          orderId: result.insertId,
        });
      }
    );
  });
};

const orderByUserId = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send({ message: "userId is required" });
  }

  const getOrdersQuery = `
    SELECT orderId, bookName, userId, quantity, amount, status ,paymenturl
    FROM orders
    WHERE userId = ?
  `;

  db.query(getOrdersQuery, [userId], (err, rows) => {
    if (err) {
      // console.error("Error fetching orders:", err.stack);
      res.status(500).send("Error fetching orders");
      return;
    }

    if (rows.length === 0) {
      return res.status(404).send({ message: "No orders found for this user" });
    }

    res.status(200).send({
      status: "success",
      data: rows,
    });
  });
};

module.exports = { orderByUserId, addOrder };
