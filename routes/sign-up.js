import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
    res.render('signup', {
        TITLE: 'SIGNUP PAGE'

    });
});

// create a user or sign up 
router.post('/', (req, res) => {
    const default_type = "user";
    const user = new users({
        username: req.body.username,
        password: req.body.password,
        Type: default_type,
        email: req.body.email,
        phone_number: req.body.phone
    })
    user.save()
        .then(result => {
            console.log(result + "added user ");
            res.render('/');
        })
        .catch(err => {
            console.log(err);
        });

});


export default router;