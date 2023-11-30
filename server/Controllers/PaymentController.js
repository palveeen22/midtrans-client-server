"useStatic";
const midtransClient = require("midtrans-client");
const dotenv = require("dotenv");
dotenv.config();

class PaymentController {
  static async getPayment(req, res) {
    const serverKey = process.env.SERVER_KEY;
    const clientKey = process.env.CLIENT_KEY;

    console.log(serverKey);
    console.log(clientKey);
    try {
      //saat demo production f saat deploy t
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: serverKey,
        clientKey: clientKey,
      });

      const param = {
        transaction_details: {
          order_id: req.body.order_id,
          gross_amount: req.body.total,
        },
        customer_details: {
          first_name: req.body.name,
        },
      };

      snap.createTransaction(param).then((transaction) => {
        const dataPayment = {
          response: JSON.stringify(transaction),
        };
        const token = transaction.token;
        res
          .status(200)
          .json({ message: "Berhasil", dataPayment, token: token });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PaymentController;
