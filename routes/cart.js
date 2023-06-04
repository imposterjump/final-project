import { Router } from 'express';
var router = Router();


router.get('/', function(req, res, next) {
    res.send('cart', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});

export default router;