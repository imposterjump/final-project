import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

router.get('/Product/:itemName', function(req, res, next) {

   const itemName = req.params.itemName;
   Product.findOne({name: itemName}, (err,Product) => {
    if(err || !Product){
        res.status(404).send("Product Not Found");
    } else {
        res.render('product', {Product});
    }
   });

});
export default router;