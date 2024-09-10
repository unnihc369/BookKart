const express = require("express");
const cors=require('cors');
const app = express();
const authRouter = require("./Routers/authRouter");
const bookRouter = require("./Routers/BookRouter");
const orderRouter=require('./Routers/OrderRouter');
const paymentRouter=require('./Routers/paymentRouter')
const cartRouter=require('./Routers/cartRouter')
const reviweRouter=require('./Routers/reviewRouter');
const nodemailer=require('nodemailer');
const addbook=require('./Routers/addBookRounter')

app.use(express.json());
app.use(cors());
// all routers
app.use("/user", authRouter);
app.use("/books", bookRouter);
app.use('/orders',orderRouter)
app.use('/payments',paymentRouter);
app.use('/cart',cartRouter);
app.use('/reviews',reviweRouter);
app.use('/addbook',addbook);

// email transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prvnkmrg.47@gmail.com",
    pass: "lzhbwbxgfzrcghir",
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, body } = req.body;

  // Email content
  const mailOptions = {
    from: "prvnkmrg.47@gmail.com",
    to,
    subject,
    text: body,
  };

  // Sending email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      // console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(5000, () => {
  console.log("server started at 5000");
});
