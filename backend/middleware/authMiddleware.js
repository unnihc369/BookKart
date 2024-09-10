const jwt = require("jsonwebtoken");
const db = require("./../database");
const secret = "your_secret_key";

const protect = async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
  console.log(token);
      const decodeid = await jwt.verify(token, secret);
         console.log(decodeid);
      db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [decodeid.id],
        (err, results) => {
          if (results.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
          }

          req.user = results[0];

          req.userId = decodeid.id;
          console.log(req.userId);
          next();
        }
      );

   
    } catch (error) {
      res.status(401).json({
        message: "please provide valid token",
      });
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized , no token");
  }
};

module.exports = { protect };
