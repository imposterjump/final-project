import { Router } from 'express';
var router = Router();

router.use((req, res, next) => {
    if (req.session.user !== undefined) {
        next();
    } else {
        res.render('err', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});
router.get('/', function(req, res, next) {
    res.send('cart', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});

export default router;