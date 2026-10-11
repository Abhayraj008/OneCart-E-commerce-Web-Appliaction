import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ================== COD ORDER ==================
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    const order = new Order({
      items,
      amount,
      address,
      userId: req.userId,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      date: Date.now()
    });

    await order.save();

    await User.findByIdAndUpdate(req.userId, {
      cartData: {}
    });

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order error" });
  }
};

// ================== RAZORPAY ORDER CREATE ==================
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const order = new Order({
      items,
      amount,
      address,
      userId: req.userId,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()
    });

    await order.save();

    const rzpOrder = await razorpayInstance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: order._id.toString()
    });

    res.json(rzpOrder);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order create error" });
  }
};

// ================== VERIFY PAYMENT ==================
export const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // 🔐 SIGNATURE VERIFY
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected === razorpay_signature) {

      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

      console.log("RAZORPAY ORDER:", orderInfo);
      console.log("RECEIPT:", orderInfo.receipt);

      // 🔥 IMPORTANT FIX (string → ObjectId match safe)
      const updatedOrder = await Order.findByIdAndUpdate(
        orderInfo.receipt.toString(),
        { payment: true },
        { new: true }
      );

      console.log("UPDATED ORDER:", updatedOrder);

      await User.findByIdAndUpdate(req.userId, {
        cartData: {}
      });

      return res.json({ success: true });

    } else {
      return res.json({ success: false, message: "Invalid signature" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Verify error" });
  }
};

// ================== USER ORDERS ==================
export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "userOrders error" });
  }
};

// ================== ADMIN ORDERS ==================
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "adminAllOrders error" });
  }
};

// ================== UPDATE STATUS ==================
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });

    res.json({ message: "Status Updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ORDER STATS ==================
export const getOrderStats = async (req, res) => {
  try {
    const days = Number(req.query.range) || 7;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      date: { $gte: startDate, $lte: endDate }
    });

    console.log("ORDERS FOUND:", orders.length);

    const data = {};

    for (let i = days; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      data[d.toLocaleDateString()] = 0;
    }

    orders.forEach(order => {
      const date = new Date(order.date).toLocaleDateString();

      if (data[date] !== undefined) {
        let totalItems = 0;

        order.items.forEach(item => {
          totalItems += item.quantity;
        });

        data[date] += totalItems;
      }
    });

    res.json({ success: true, data });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};