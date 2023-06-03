import { Router } from 'express';
var router = Router();
import users from "../models/users.js"
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
const { isNullOrUndefined } = pkg;



const SALT_ROUNDS = 10;

router.get('/', function(req, res, next) {
    res.render('signup', {
        TITLE: 'SIGNUP PAGE',
        message: " ",
        user: (req.session.user === undefined ? "" : req.session.user)


    });
});

// create a user or sign up 
router.post('/', (req, res) => {

    const default_type = "user";
    let counter = "a";



    console.log("infos : " + " username:" +
        req.body.username + " pass:" + req.body.pw + " conf pass:" + req.body.cpw + " email:" + req.body.email + " phone:" + req.body.phone);

    if (req.body.username == "" || req.body.pw == "" || req.body.cpw == "" || +req.body.email == "" || req.body.phone == "") {
        counter = false;
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
<<<<<<< HEAD
            message: 'Fill all fields'
=======
            message: 'please you have to fill all the information ',
            user: (req.session.user === undefined ? "" : req.session.user)
>>>>>>> c6bfb3a616c051b2d65373f28f0e0f6778338b7f

        });

    } else if (req.body.pw != req.body.cpw) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
<<<<<<< HEAD
            message: 'The password and confirmation password do not match.'
=======
            message: 'the passwords doesnt match pls try again ',
            user: (req.session.user === undefined ? "" : req.session.user)
>>>>>>> c6bfb3a616c051b2d65373f28f0e0f6778338b7f

        });

    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
<<<<<<< HEAD
            message: 'Email invalid. Please try again'
=======
            message: 'the email is invalid please try again ',
            user: (req.session.user === undefined ? "" : req.session.user)
>>>>>>> c6bfb3a616c051b2d65373f28f0e0f6778338b7f

        });


    } else if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.phone) == false) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
<<<<<<< HEAD
            message: 'Phone number invalid. Please try again'
=======
            message: 'the phone number is invalid pls try again  ',
            user: (req.session.user === undefined ? "" : req.session.user)
>>>>>>> c6bfb3a616c051b2d65373f28f0e0f6778338b7f

        });
    } else {


        var query = { username: req.body.username };

        users.find(query).then(result => {
                console.log(result);


                if (result != "") {


                    counter = "b";

                    res.render('signup', {
                        TITLE: 'SIGNUP PAGE',
<<<<<<< HEAD
                        message: 'User name already exists'
=======
                        message: 'this username is already taken please try another one ',
                        user: (req.session.user === undefined ? "" : req.session.user)
>>>>>>> c6bfb3a616c051b2d65373f28f0e0f6778338b7f





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
                            res.render('HomePage', { user: (req.session.user === undefined ? "" : req.session.user) });
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