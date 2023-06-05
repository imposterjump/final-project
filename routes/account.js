import { Router } from 'express';
var router = Router();
import users from "../models/users.js"



router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type == "user") {
        next();
    } else {
        res.render('err', { err: 'You must be logged in ', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});
router.get('/', function(req, res, next) {
    res.render('account', {
        user: (req.session.user === undefined ? "" : req.session.user)

    });

});

router.post("/edit", function(req, res, next) {


console.log(req.body.email+req.body.phone+req.session.id)
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



    const SALT_ROUNDS = 10;

    users.findOneAndUpdate({username:req.session.user.username}, {
            email: req.body.email,
            phone_number: req.body.phone
        })
        .then(result => {
          console.log(result);
          req.session.user.email = req.body.email;
          req.session.user.phone_number = req.body.phone;
          res.render('account' , { message: 'Info Updated', user: (req.session.user === undefined ? "" : req.session.user) });



        })
        .catch(err => {
            console.log(err);
        });

      }




    });

export default router;