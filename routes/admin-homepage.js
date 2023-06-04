import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {
    const analyticsdata = {
        numberOforderschartdata: [10, 20, 30, 40, 50],
        numberofvisitorschartdata: [5, 10, 15, 20, 25],
        numberoforders: 550,
        numberofvisitorstoday: 600,
        registeredusers: 6500,
        tobefulfilled:26,
        totalsales:4947,


    };
    
    res.render('adminhome',{analyticsData});
});

export default router;