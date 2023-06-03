import { Router } from 'express';
const router = Router();

router.get('/', function(req, res, next) {
    res.render('about', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
});
export default router;