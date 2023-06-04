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
    const analyticsdata = {
        numberOforderschartdata: [10, 20, 30, 40, 50],
        numberofvisitorschartdata: [5, 10, 15, 20, 25],
        numberoforders: 550,
        numberofordersch: 550,
        numberofvisitorstoday: 600,
        numberofvisitorsch: 600,
        registeredusers: 6500,
        registeredusersch: 6500,
        tobefulfilled:26,
        tobefulfilledch:26,
        totalsales:8125,
        totalsales:130


    };

    res.render('adminhome', { analyticsdata });
});

export default router;