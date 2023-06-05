import { Router } from 'express';
import Product from '../models/Product.js';
import users from '../models/users.js';
import Order from '../models/order.js';

const router = Router();
//get shipping form
router.post('/', (req, res) => {
    if (req.session.user.cart != "") {
        console.log(req.session.user.cart);
        let size = req.session.user.cart.length;
        console.log(size);
        let quanitity_arr = new Array(size);
        for (i = 0; i < size; i++) {
            //quanitity_arr[i] = req.body.

        }


        res.render('shippingform', {
            user: (req.session.user === undefined ? "" : req.session.user)
        });
    } else {
        res.render('err', { err: 'sorry cart is empty ', user: (req.session.user === undefined ? "" : req.session.user) })

    }


});
export default router;