import { Router } from 'express';
var router = Router();
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;


import users from "../models/users.js"



router.get('/', function(req, res, next) {

    users.find()
        .then(result => {
            console.log(result);
            res.render('admin_user_controls', {
                users: result,
                TITLE: 'SIGNUP PAGE',
                message: '',
                user: (req.session.user === undefined ? "" : req.session.user)



            });

        })
        .catch(err => {
            console.log(err);
        });


});
router.post('/search', function(req, res, next) {

    console.log(req.body.search_bar_users);
    if (req.body.search_bar_users == "" || req.body.search_bar_users == null) {
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: '', user: (req.session.user === undefined ? "" : req.session.user) });
                // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
            })
            .catch(err => {
                console.log(err);
            });

    } else {
        var query = { username: req.body.search_bar_users };
        users.find(query)
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: '', user: (req.session.user === undefined ? "" : req.session.user) });
                // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
            })
            .catch(err => {
                console.log(err);
            });

    }





});
router.post("/edit/:id", function(req, res, next) {



    const default_type = "user";
    let counter = "a";




    console.log("infos : " + " username:" +
        req.body.username + " pass:" + req.body.pw + " conf pass:" + req.body.cpw + " email:" + req.body.email + " phone:" + req.body.phone);

    if (req.body.username == "" || req.body.pw == "" || req.body.cpw == "" || +req.body.email == "" || req.body.phone == "") {
        counter = false;
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'please you have to fill all the information ', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });


    } else if (req.body.pw != req.body.cpw) {
        counter = "b";
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'the passwords doesnt match pls try again ', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });


    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false) {
        counter = "b";
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'the email is invalid please try again', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });


    } else if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.phone) == false) {
        counter = "b";
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'the phone number is invalid pls try again ', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });

    } else {



        const SALT_ROUNDS = 10;

        users.findByIdAndUpdate(req.params.id, {

                username: req.body.username,
                password: bcrypt.hashSync(req.body.pw, SALT_ROUNDS),

                type: default_type,
                email: req.body.email,
                phone_number: req.body.phone
            })
            .then(result => {
                res.redirect('/admin-user-management');


            })
            .catch(err => {
                console.log(err);
            });












    }




});
router.post('/delete/:username', function(req, res, next) {

    users.findOneAndDelete({ username: req.params.username }).then(result => {

            console.log(result);
            res.redirect('/admin-user-management');

        })
        .catch(err => {
            console.log(err);
        });
});
router.post('/adduser', (req, res) => {


    let counter = "a";



    console.log("infos : " + " username:" +
        req.body.username + " pass:" + req.body.pw + " conf pass:" + req.body.cpw + " email:" + req.body.email + " phone:" + req.body.phone + " type : " + req.body.type);

    if (req.body.username == "" || req.body.pw == "" || req.body.cpw == "" || +req.body.email == "" || req.body.phone == "" || req.body.type == "") {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'Fill all fields ',
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

                    const default_type = req.body.type;

                    const SALT_ROUNDS = 10;

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
                            users.find()
                                .then(result => {
                                    console.log(result);
                                    res.render('admin_user_controls', { users: result, message: '', user: (req.session.user === undefined ? "" : req.session.user) });
                                    // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
                                })
                                .catch(err => {
                                    console.log(err);
                                });
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



});

export default router;