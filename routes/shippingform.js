import { Router } from 'express';
import products from '../models/Product.js';
import users from '../models/users.js';
import Order from '../models/order.js';
import OrderItem from '../models/order-item.js';

const router = Router();
router.post('/checkout', (req, res) => {
  const { products, total, address, city, phone, } = req.body;
  const username = req.session.user.username;
  // Save the order details to the database using your Mongoose schema
  const order = new Order({
    products,
    totalPrice: total,
    username,
    address,
    city,
    phone,
  });

  console.log("Order Details:", order);

  order.save()
    .then((savedOrder) => {
      // Handle the successful saving of the order
      // Redirect or send a response to the frontend
      res.redirect('/home'); // Redirect to a success page
    })
    .catch((error) => {
      // Handle any errors that occur during the saving process
      // Send an error response to the frontend
      res.status(500).json({ error: 'Failed to save the order.' });
    });
});

export default router;