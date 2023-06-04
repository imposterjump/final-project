import { Router } from 'express';
var router = Router();




router.get('/', function(req, res, next) {
    res.send('account', {
        user: (req.session.user === undefined ? "" : req.session.user)

    });

});

export default router;