import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('ordertrack', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});
export default router;