import express from 'express';
import Product from '../models/Product.js';
import path from "path";
import logger from "morgan";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
const router = express.Router();

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get('/:id', (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
        .then((product) => {
            res.render('edit', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});
router.post('/:id', async(req, res, next) => {
    const id = req.params.id;

    if (!req.files || !req.files.image) {
        return res.status(400).send('No image file was uploaded.');
    }

    const imgFile = req.files.image;
    const uploadPath = path.join(
        process.cwd(),
        'public',
        'uploads',
        req.body.title + path.extname(imgFile.name)
    );

    imgFile.mv(uploadPath, function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while uploading the image file.');
        }

        const pro = {
            itemName: req.body.itemName,
            Sales: req.body.Sales,
            description: req.body.description,
            price_before: req.body.price_before,
            price_after: req.body.price_after,
            type: req.body.type,
            images: req.body.i + path.extname(imgFile.name),
        };

        Product.findByIdAndUpdate(id, pro)
            .then(result => {
                console.log(result);
                res.redirect('/vproducts');
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('An error occurred while updating the product.');
            });
    });
});


export default router;