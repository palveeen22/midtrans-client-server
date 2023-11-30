const express = require("express");
const router = express.Router();
//midtrans
const PaymentController = require("../Controllers/PaymentController");

router.post("/process-transaction", PaymentController.getPayment);

module.exports = router;
