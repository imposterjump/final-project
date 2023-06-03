import { Router } from 'express';
var router = Router();

router.get('/', function(req, res, next) {


    res.render('HomePage', { user: (req.session.user === undefined ? "" : req.session.user) });
});

export default router;