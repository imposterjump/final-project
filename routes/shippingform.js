import { Router } from 'express';
import products from '../models/Product.js';
import users from '../models/users.js';
import Order from '../models/order.js';
import OrderItem from '../models/order-item.js';

const router = Router();
router.post('/checkout', (req, res) => {
  const { products, total, firstName, lastName, email, phone, address, city, paymentMethod } = req.body;
  
  const order = new Order({
    products,
    totalPrice: total,
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    paymentMethod,
  });

  console.log("Order Details:", order);

  order.save()
    .then((savedOrder) => {
      
      res.redirect('/home'); 
    })
    .catch((error) => {
    
      res.status(500).json({ error: 'Failed to save the order.' });
    });
});


export default router;