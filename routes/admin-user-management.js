import { Router } from 'express';
var router = Router();
import users from "../models/users.js"

router.get('/', function(req, res, next) {

    users.find()
        .then(result => {
            console.log(result);
            res.render('admin_user_controls', { users: result });
            // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
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
                res.render('admin_user_controls', { users: result });
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
                res.render('admin_user_controls', { users: result });
                // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
            })
            .catch(err => {
                console.log(err);
            });

    }





});

export default router;