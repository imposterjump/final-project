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
  const wishlist = req.session.user.wishlist;

  Product.find({ _id: { $in: wishlist } })
    .then(products => {
      console.log(products);
      res.render("wishlist", { products, user: (req.session.user === undefined ? "" : req.session.user) });
    })
    .catch(err => {
      console.log(err);
      res.render("wishlist", { products: [], user: (req.session.user === undefined ? "" : req.session.user) });
    });
});

router.get("/add/:id", function(req, res, next) {
  const userId = req.session.user._id;
  const productId = req.params.id;
  const newlist = req.session.user.wishlist;

  if (newlist.includes(productId)) {
    console.log("The product is already in the wishlist");
    return res.redirect("back"); // Redirect back to the referring page
  }

  newlist.push(productId);

  users.updateOne({ _id: userId }, { wishlist: newlist }) // Update the wishlist field
    .then(result => {
      console.log(`Product ${productId} added to wishlist`);
      // Update the wishlist in the session
      req.session.user.wishlist = newlist;
      res.redirect("back"); // Redirect back to the referring page
    })
    .catch(err => {
      console.log(err);
      res.redirect("back"); // Redirect back to the referring page
    });
});


  
router.get("/delete/:id", function(req, res, next) {
  const productId = req.params.id;
  const wishlist = req.session.user.wishlist;
  const newlist = wishlist.filter(item => item !== productId);

  // Update the cart in session
  req.session.user.wishlist= newlist;

  // Update the cart in the database
  const userId = req.session.user._id;
  users.updateOne({ _id: userId }, { wishlist: newlist })
    .then(() => {
      console.log(`Product ${productId} removed from wishlist`);
      res.redirect("/wishlist");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/wishlist");
    });
});

export default router;