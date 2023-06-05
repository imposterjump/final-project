import { Router } from 'express';
import Product from '../models/Product.js';
import users from '../models/users.js';

const router = Router();

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.type === "user") {
    next();
  } else {
    res.render('err', {
      err: 'You are not signed in as a user. Please sign in.',
      user: (req.session.user === undefined ? "" : req.session.user)
    });
  }
});

router.get('/', function(req, res, next) {
  const cart = req.session.user.cart;

  Product.find({ _id: { $in: cart } })
    .then(products => {
      console.log(products);
      res.render("cart", { products, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
      res.render("cart", { products: [], user: (req.session.user === undefined ? "" : req.session.user) });
    });
});

router.get("/add/:id", function(req, res, next) {
  const userId = req.session.user._id;
  const productId = req.params.id;
  const newCart = req.session.user.cart;

  if (newCart.includes(productId)) {
    console.log("The product is already in the cart");
    return res.redirect("back"); // Redirect back to the referring page
  }

  newCart.push(productId);

  users.updateOne({ _id: userId }, { cart: newCart })
    .then(result => {
      console.log(`Product ${productId} added to cart`);
      res.redirect("back"); // Redirect back to the referring page
    })
    .catch(err => {
      console.log(err);
      res.redirect("back"); // Redirect back to the referring page
    });
});

  
router.get("/delete/:id", function(req, res, next) {
  const productId = req.params.id;
  const cart = req.session.user.cart;

  const newCart = cart.filter(item => item !== productId);

  // Update the cart in session
  req.session.user.cart = newCart;

  // Update the cart in the database
  const userId = req.session.user._id;
  users.updateOne({ _id: userId }, { cart: newCart })
    .then(() => {
      console.log(`Product ${productId} removed from cart`);
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/cart");
    });
});

export default router;
