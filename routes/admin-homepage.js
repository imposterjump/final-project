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
        numberoforderschartdata: [10, 20, 30, 5, 35],
        numberofvisitorschartdata: [5, 10, 15, 20, 25],
        numberoforders: 550,
        numberofordersch: 550,
        numberofvisitorstoday: 600,
        numberofvisitorsch: 600,
        registeredusers: 6500,
        registeredusersch: 6500,
        tobefulfilled: 26,
        tobefulfilledch: 26,
        totalsales: 8125,
        totalsalesch: 130


    };

    res.render('adminhome', { analyticsdata, user: (req.session.user === undefined ? "" : req.session.user) });
});

export default router;