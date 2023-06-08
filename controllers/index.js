import Product from '../models/Product.js';
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;
const SALT_ROUNDS = 10;



const get_about_page = function(req, res, next) {
    res.render('about', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
}
const get_accessories_page = function(req, res, next) {

    Product.find({ type: 'accessories' })
        .then(result => {
            console.log(result);
            res.render('accessories', {
                Product: result,
                TITLE: 'PRODUCT PAGE',
                message: '',

                user: (req.session.user === undefined ? "" : req.session.user)



            });
        })
        .catch(err => {
            console.log(err);
        });


}
const get_tops_page = function(req, res, next) {

    Product.find({ type: 'tops' })
        .then(result => {
            console.log(result);
            res.render('tops', {
                Product: result,
                TITLE: 'PRODUCT PAGE',
                message: '',

                user: (req.session.user === undefined ? "" : req.session.user)



            });
        })
        .catch(err => {
            console.log(err);
        });


}
const get_bottoms_page = function(req, res, next) {

    Product.find({ type: 'bottoms' })
        .then(result => {
            console.log(result);
            res.render('bottoms', {
                Product: result,
                TITLE: 'PRODUCT PAGE',
                message: '',

                user: (req.session.user === undefined ? "" : req.session.user)



            });
        })
        .catch(err => {
            console.log(err);
        });


}
const get_help_page = function(req, res, next) {
    res.render('help', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
}
const get_home_page = function(req, res, next) {


    res.render('homepage', { user: (req.session.user === undefined ? "" : req.session.user) });
}
const search_for_product = function(req, res, next) {

    const s = req.body.search_bar;
    console.log(s);
    Product.find({ itemName: { $regex: s, $options: "i" }, description: { $regex: s, $options: "i" } })
        .then(result => {
            console.log(result);

            res.render('productsearch', { Product: result, user: (req.session.user === undefined ? "" : req.session.user) });




        })
        .catch(err => {
            console.log(err);
        });



}
const display_product_details = (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('item-details', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}
const get_jackets_page = function(req, res, next) {

    Product.find({ type: 'jackets' })
        .then(result => {
            console.log(result);
            res.render('jackets', {
                Product: result,
                TITLE: 'PRODUCT PAGE',
                message: '',

                user: (req.session.user === undefined ? "" : req.session.user)



            });
        })
        .catch(err => {
            console.log(err);
        });


}
const get_product = function(req, res, next) {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product1) => {
            res.render('product', {
                product1,
                message: '',

                user: (req.session.user === undefined ? "" : req.session.user)
            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });

}
const get_sign_in_page = function(req, res, next) {
    res.render('signin', {
        message: "",
        user: (req.session.user === undefined ? "" : req.session.user)
    });
}
const user_sign_in = function(req, res, next) {
    let temp_password = req.body.password;
    let query = { username: req.body.username };
    console.log("temp username : " + req.body.username + " temp password : " + temp_password);
    users.findOne(query)
        .then(result => {



            if (result != null) {
                console.log(" i am not null");
                console.log(result);
                let mytype = result.type;
                const me = result;


                bcrypt.compare(req.body.password, result.password, (err, result) => {
                    if (err || !result) {
                        console.log("wrong pass ");

                        res.render('signin', {
                            message: "sorry this password is incorrect please try agaim ",
                            user: (req.session.user === undefined ? "" : req.session.user)
                        });
                        return false;




                    } else {
                        console.log("correct password and type = " + mytype);
                        if (mytype == 'user') {
                            req.session.user = me;
                            res.render('homepage', { user: (req.session.user === undefined ? "" : req.session.user) });
                            return true;
                        } else if (mytype == 'admin') {
                            req.session.user = me;
                            console.log(req.session.user);
                            const analyticsdata = {
                                numberOforderschartdata: [10, 20, 30, 40, 50],
                                numberofvisitorschartdata: [5, 10, 15, 20, 25],
                                numberoforders: 550,
                                numberofordersch: 550,
                                numberofvisitorstoday: 600,
                                numberofvisitorsch: 600,
                                registeredusers: 6500,
                                registeredusersch: 6500,
                                tobefulfilled: 26,
                                tobefulfilledch: 26,
                                totalsales: 8125,
                                totalsales: 130


                            };
                            users.find()
                                .then(result => {
                                    console.log(result);
                                    res.render('adminhome', {
                                        analyticsdata,

                                        users: result,
                                        TITLE: 'admin home page',
                                        message: '',
                                        user: (req.session.user === undefined ? "" : req.session.user)



                                    });

                                })
                                .catch(err => {
                                    console.log(err);
                                });

                            return true;

                        }


                    }




                });






            } else {
                console.log(" i am null");
                res.render('signin', {

                    message: "sorry this username doesnt exist please try agaim ",
                    user: (req.session.user === undefined ? "" : req.session.user)
                });

            }





        })
        .catch(err => {
            console.log(err);
        });


}
const ajax_check_username = function(req, res) {

    var query = { username: req.body.username };
    console.log(" i am in ajax ");
    users.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            } else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });

}



const get_sign_up_page = function(req, res, next) {
    res.render('signup', {
        TITLE: 'SIGNUP PAGE',
        message: " ",
        user: (req.session.user === undefined ? "" : req.session.user)


    });
}



const user_signup = (req, res) => {

    const default_type = "user";
    let counter = "a";



    console.log("infos : " + " username:" +
        req.body.username + " pass:" + req.body.pw + " conf pass:" + req.body.cpw + " email:" + req.body.email + " phone:" + req.body.phone);

    if (req.body.username == "" || req.body.pw == "" || req.body.cpw == "" || +req.body.email == "" || req.body.phone == "") {
        counter = false;
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'Fill all fields',
            user: (req.session.user === undefined ? "" : req.session.user)

        });

    } else if (req.body.pw != req.body.cpw) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'The password and confirmation password do not match.',
            user: (req.session.user === undefined ? "" : req.session.user)

        });

    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'Email invalid. Please try again',
            user: (req.session.user === undefined ? "" : req.session.user)

        });


    } else if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.phone) == false) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'Phone number invalid. Please try again',
            user: (req.session.user === undefined ? "" : req.session.user)

        });
    } else {


        var query = { username: req.body.username };

        users.find(query).then(result => {
                console.log(result);


                if (result != "") {


                    counter = "b";

                    res.render('signup', {
                        TITLE: 'SIGNUP PAGE',
                        message: 'Username already exists',
                        user: (req.session.user === undefined ? "" : req.session.user)





                    });


                } else {

                    const user = new users({
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.pw, SALT_ROUNDS),

                        type: default_type,
                        email: req.body.email,
                        phone_number: req.body.phone
                    });
                    user.save()
                        .then(result => {
                            console.log(result + "added user");
                            res.render('homepage', { user: (req.session.user === undefined ? "" : req.session.user) });
                        })
                        .catch(err => {
                            console.log(err);

                        });

                }


            })
            .catch(err => {
                console.log(err);
            });





    }



}

export default {
    get_about_page,
    get_accessories_page,
    get_bottoms_page,
    get_help_page,
    get_home_page,
    search_for_product,
    display_product_details,
    get_jackets_page,
    get_product,
    get_sign_in_page,
    user_sign_in,
    ajax_check_username,
    get_sign_up_page,
    user_signup,
    get_tops_page
}