import { Router } from 'express';
import Product from '../models/Product.js';
import users from '../models/users.js';
import Order  from '../models/order.js';

const router = Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('orderItems.product', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Create a new order
router.post('/', async (req, res) => {
  const order = new Order({
    user: req.body.user,
    orderItems: req.body.orderItems,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export default router;
