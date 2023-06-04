import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
    res.render('Bottoms', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});

export default router;