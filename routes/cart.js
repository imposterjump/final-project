import { Router } from 'express';
var router = Router();
import Product from '../models/Product.js';
//render


router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'user') {
        next();
    } else {
        res.render('err', {
            err: 'You are signed in as a user pls sign in ',
            user: (req.session.user === undefined ? "" : req.session.user)
        })
    }
});

router.get('/', function(req, res, next) {
    const arr = req.session.user.cart;

    Product.find({ _id: { $in: arr } })
        .then(result => {
            console.log(result);
            res.render("cart", { product: result, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => { console.log(err) });


});
//add
router.get("/add/:id", function(req, res, next) {


    const id1 = req.session.user._id;
    const itemId = req.params.id;

    console.log(itemId);

    console.log(req.session.user.cart);



    let ishere = false;
    const newcart = req.session.user.cart;
    const id2 = { _id: id1 };
    console.log(id1);
    console.log("------");


    if (newcart.includes(itemId)) {
        ishere = false;
        console.log("the product already in the cart");
        res.redirect("/");

    } else {
        ishere = true;
    }


    if (ishere) {
        req.session.user.cart.push(itemId);

        user1
            .updateOne(id2, { cart: newcart })
            .then(result => {

                console.log(id1);
                res.redirect("/")
            })
            .catch(err => {
                console.log(err)
            })

    }
});
//delete
router.get("/delete/:id", function(req, res, next) {

    const id1 = req.session.user._id;
    const itemId = req.params.id;

    const newcart = req.session.user.cart;
    const id2 = { _id: id1 };

    var index = newcart.indexOf(itemId);
    if (index > -1) {
        newcart.splice(index, 1);
    }

    console.log(newcart);
    user1
        .updateOne(id2, { cart: newcart })
        .then(result => {
            console.log(id1);
            res.redirect("/cart")
        })
        .catch(err => {
            console.log(err)
        })
})
export default router;