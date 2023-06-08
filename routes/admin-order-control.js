import { Router } from 'express';

import Order from '../models/order.js';
const router = Router();
router.use((req, res, next) => {
    console.log(req.session.user.type);
    if (req.session.user !== undefined && req.session.user.type == "admin") {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});
router.get('/', (req, res) => {
    
    Order.find()
        .then((orders) => {
            res.render('ordercontrol', {orders, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
           
        });
});
router.get('/delete/:id', (req, res) => {
    const orderId = req.params.id;
  
    Order.findByIdAndDelete(orderId)
      .then(() => {
        res.redirect('/admin-order-control');
      })
      .catch((err) => {
        console.log(err);

      });
  });

export default router;