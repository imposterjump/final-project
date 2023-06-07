import { Router } from 'express';
var router = Router();


router.use((req, res, next) => {
    console.log(req.session.user.type);
    if (req.session.user !== undefined && req.session.user.type == 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


router.get('/', function(req, res, next) {
    const analyticsdata = {
        revenue:5000,
        numberofvisitors:50,
        totalsales: 125,
        registered:90
    };

    res.render('adminhome', { analyticsdata, user: (req.session.user === undefined ? "" : req.session.user) });
});

export default router;