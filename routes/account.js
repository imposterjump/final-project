import { Router } from 'express';
var router = Router();



router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You must be loged in ', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});
router.get('/', function(req, res, next) {
    res.render('account', {
        user: (req.session.user === undefined ? "" : req.session.user)

    });

});

export default router;