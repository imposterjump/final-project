import { Router } from 'express';
import products from '../models/Product.js';
import users from '../models/users.js';
import Order from '../models/order.js';
import OrderItem from '../models/order-item.js'

const router = Router();
//get shipping form
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  let orderItems;

  if (Array.isArray(productId) && Array.isArray(quantity)) {
    // Assuming productId and quantity are arrays
    orderItems = productId.map((id, index) => ({
      productId: id,
      quantity: quantity[index],
    }));
  } else {
    // Assuming productId and quantity are single values
    orderItems = [{
      productId,
      quantity,
    }];
  }

  try {
    // Save order items to the database
    const savedOrderItems = await OrderItem.create(orderItems);

    // Console.log all products with their quantities
    
    savedOrderItems.forEach((item) => {
      console.log(`Product ID: ${item.productId}, Quantity: ${item.quantity}`);
    });

    // Return the saved order items in the response
    res.json(savedOrderItems);
  } catch (error) {
    console.error(error);
    // Handle the error and send an appropriate response
    res.status(500).json({ error: 'Failed to save order items to the database' });
  }
});

export default router;