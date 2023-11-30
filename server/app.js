const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PaymentRoutes = require("./routes/payment.routes.js");

//server running port
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//payment routess
app.use("/api/payment", PaymentRoutes);

app.get("/", (req, res) => {
  res.send(`listen to port : ${port}`);
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});

module.exports = app;
