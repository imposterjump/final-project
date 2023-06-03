import { Router } from 'express';
var router = Router();

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get('/', function(req, res, next) {
    const analyticsData = {
        numberOforderschartdata: [10, 20, 30, 40, 50],
        numberofvisitorschartdata: [5, 10, 15, 20, 25],
        numberoforders: 550,
        numberofvisitorstoday: 600,
        registeredusers: 6500,
        tobefulfilled: 26


    };

    res.render('adminhome', { analyticsData });
});

export default router;