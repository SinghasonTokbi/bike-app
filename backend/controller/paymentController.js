import pool from "../config/db.js";
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto'; // Importing crypto module
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order function
export const createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    if (!amount || !currency || !receipt) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const options = {
      amount: amount * 100, // Convert to smallest currency unit (paisa for INR)
      currency: currency,
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ error: 'Error creating order' });
  }
};

// Verify payment function
export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log('Order ID:', razorpay_order_id);
  console.log('Payment ID:', razorpay_payment_id);
  console.log('Received Razorpay Signature:', razorpay_signature);

  try {
    // Create HMAC using the order ID and payment ID
    const hmac = crypto.createHmac('sha256', razorpay.key_secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    console.log("Generated Signature: ", generated_signature);

    // Compare generated signature with received signature
    if (generated_signature === razorpay_signature) {
      console.log("hehreee")
      console.log("Payment verification successful");
      res.send('Payment verification successful');
    } else {
      console.error("Signature mismatch: ", generated_signature);
      res.status(400).send('Payment verification failed');
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).send({ error: 'Error verifying payment' });
  }
};

// Fetch payment details
export const paymentDetails = async (req, res) => {
  const paymentId = req.params.id;
  console.log("Fetching payment details for:", paymentId);
  try {
    const paymentDetails = await razorpay.payments.fetch(paymentId);
    res.json(paymentDetails);
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ error: 'Error fetching payment details' });
  }
};

// Get all transactions
export const gettransaction = async (req, res) => {
  console.log("Fetching all transactions...");
  try {
    const result = await pool.query("SELECT * FROM transactions");
    
    console.log(result.rows)
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

// Insert payment info into database
export const insertPayInfo = async (req, res) => {
  try {
    console.log("Received payment info:", req.body);
    const {paymentId, status, bookId, amount, paymentType} = req.body

    // paymentId: 'pay_PO1hNefr5qh2X4',
    // status: 'success',
    // details: 'Payment verification successful',
    // bookId: 1
    // Ensure that the required fields are present
    const insertPayment = pool.query('insert into transactions(booking_id, amount, status, method, ref_id) values($1,$2,$3,$4,$5)',[bookId, amount, status, paymentType, paymentId])

    
    
   res.json(insertPayment)

    
  } catch (err) {
    console.error("Error inserting payment info:", err);
    res.status(500).json({ error: 'Error inserting payment info' });
  }
};
