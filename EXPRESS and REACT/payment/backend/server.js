const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors()); // allow React frontend

const razorpay = new Razorpay({
  key_id: "rzp_test_SeuCvXKvas0a2D",
  key_secret: "rTm6Mw7FX5S85eOKpSU5c22G"
});

// Create Order
app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt_1"
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Verify Payment
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", "YOUR_SECRET")
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    res.send("✅ Payment Verified");
  } else {
    res.status(400).send("❌ Invalid Signature");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));