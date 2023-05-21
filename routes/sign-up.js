import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
    res.render('signup', {
        TITLE: 'SIGNUP PAGE '

    });
});

export default router;