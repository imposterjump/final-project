import Product from '../models/Product.js';
import users from '../models/users.js';

import bcrypt from 'bcrypt'

//function line numbers 
// mycart 13 , addtocart 28, deletefromcart 51 , display_user_profile 76, edit_user_profile 86 , edit_user_password 135
//get_order_item 187, create_order 196, track_order 216 , shippingform_checkout 222





// cart functions 
const mycart = (req, res, next) => {
    const cart = req.session.user.cart;

    Product.find({ _id: { $in: cart } })
        .then(products => {
            console.log(products);
            res.render("cart", { products, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch(err => {
            console.log(err);

        });
}

const addtocart = (req, res, next) => {
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
}

const deletefromcart = (req, res, next) => {
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
}




// account function 
const display_user_profile = (req, res, next) => {
    res.render('account', {
        user: (req.session.user === undefined ? "" : req.session.user)

    });

}


const edit_user_profile = (req, res, next) => {


    console.log(req.body.email + req.body.phone + req.session.id)
    const default_type = "user";
    let counter = "a";
    if (req.body.email == "" || req.body.phone == "") {
        counter = "b";

        res.render('account', { message: 'please you have to fill all the information ', user: (req.session.user === undefined ? "" : req.session.user) });

    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false) {
        counter = "b";
        res.render('account', { message: 'please you have to fill all the information ', user: (req.session.user === undefined ? "" : req.session.user) });

    } else if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.phone) == false) {
        counter = "b";
        res.render('account', { message: 'please you have to fill all the information ', user: (req.session.user === undefined ? "" : req.session.user) });

    } else {





        users.findOneAndUpdate({ username: req.session.user.username }, {
                email: req.body.email,
                phone_number: req.body.phone
            })
            .then(result => {
                console.log(result);
                req.session.user.email = req.body.email;
                req.session.user.phone_number = req.body.phone;
                res.render('account', { message: 'Info Updated', user: (req.session.user === undefined ? "" : req.session.user) });



            })
            .catch(err => {
                console.log(err);
            });

    }




}

const edit_user_password = function(req, res, next) {

    const default_type = "user";
    let counter = "a";

    if (req.body.pw == "" || req.body.cpw == "") {
        counter = "b";
        res.render('account', { message: 'please you have to fill all the information ', user: (req.session.user === undefined ? "" : req.session.user) });


    } else if (req.body.pw != req.body.cpw) {
        counter = "b";
        res.render('account', { message: 'Password and confirm password dont match. ', user: (req.session.user === undefined ? "" : req.session.user) });

    } else {



        const SALT_ROUNDS = 10;

        users.findOneAndUpdate({ username: req.session.user.username }, {
                password: bcrypt.hashSync(req.body.pw, SALT_ROUNDS),
            })
            .then(result => {
                req.session.user.password = req.body.password;
                res.render('account', { message: 'Info Updated', user: (req.session.user === undefined ? "" : req.session.user) });


            })
            .catch(err => {
                console.log(err);
            });












    }
}




//orders functions 

const get_order_item = async(req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('orderItems.product', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const create_order = async(req, res) => {
    const order = new Order({
        user: req.body.user.username,
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
}
const track_order = function(req, res, next) {
    res.render('ordertrack', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
}

const shippingform_checkout = (req, res) => {
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

            res.redirect("ordertrack", { user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((error) => {

            res.status(500).json({ error: 'Failed to save the order.' });
        });
}

const display_wishlist = function(req, res, next) {
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
}
const add_to_wishlist = function(req, res, next) {
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
}
const delete_from_wishlist = function(req, res, next) {
    const productId = req.params.id;
    const wishlist = req.session.user.wishlist;
    const newlist = wishlist.filter(item => item !== productId);

    // Update the cart in session
    req.session.user.wishlist = newlist;

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
}
export default {
    mycart,
    addtocart,
    deletefromcart,
    display_user_profile,
    edit_user_profile,
    edit_user_password,
    get_order_item,
    create_order,
    track_order,
    shippingform_checkout,
    display_wishlist,
    add_to_wishlist,
    delete_from_wishlist
};