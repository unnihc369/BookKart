const db = require("./../database");

const addtoCart = (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).send({ message: "userId and bookId are required" });
  }

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS cart (
      cartId INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      bookId INT,
      FOREIGN KEY (userId) REFERENCES users(user_id),
      FOREIGN KEY (bookId) REFERENCES books(book_id)
    );
  `;

  const insertItemQuery = `
    INSERT INTO cart (userId, bookId)
    VALUES (?, ?)
  `;

  // First, create the table if it doesn't exist
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating table:", err.stack);
      res.status(500).send("Error creating table");
      return;
    }

    // Then, insert the new item into the cart
    db.query(insertItemQuery, [userId, bookId], (err, result) => {
      if (err) {
        console.error("Error inserting item:", err.stack);
        res.status(500).send("Error inserting item");
        return;
      }
      res
        .status(200)
        .send({ message: "Item added to cart", cartId: result.insertId });
    });
  });
};

const getCartAll = (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  if (!userId) {
    return res.status(400).send({ message: "userId is required" });
  }

  const getCartItemsQuery = `
    SELECT cart.cartId, cart.userId, cart.bookId, books.name, books.author, books.amount,books.url 
    FROM cart
    JOIN books ON cart.bookId = books.book_id
    WHERE cart.userId = ?
  `;

  db.query(getCartItemsQuery, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching users:", err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    // console.log(rows);

    if (rows.length === 0) {
      return res.status(200).send({
        status: "success",
        data: [],
      });
    }

    res.status(200).send({
      status: "success",
      data: rows,
    });
  });
};

const removeFromCart = (req, res) => {
  const { cartId } = req.params;

  if (!cartId) {
    return res.status(400).send({ message: "cartId is required" });
  }

  const deleteItemQuery = `DELETE FROM cart WHERE cartId = ?`;

  db.query(deleteItemQuery, [cartId], (err, result) => {
    if (err) {
      console.error("Error deleting item:", err.stack);
      return res.status(500).send("Error deleting item from cart");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    res.status(200).send({ message: "Item removed from cart" });
  });
};


module.exports = { addtoCart, getCartAll, removeFromCart };
