import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js';
import mongoose from 'mongoose';
import express from 'express';
const router = Router();
// Multer configuration
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Only JPEG and PNG files are allowed.'), false); // Reject the file
        }
    }
});

// Middleware
router.use(express.urlencoded({ extended: false }));
router.use(express.json());



router.use((req, res, next) => {
    console.log(req.session.user.type);
    if (req.session.user !== undefined && req.session.user.type == "admin") {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});


router.get('/', (req, res) => {
    res.render('admin-product-management', {
        user: (req.session.user === undefined ? "" : req.session.user)

    });
});





router.get('/all-articles/:id', (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('details', {
                product,

                user: (req.session.user === undefined ? "" : req.session.user)

            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});

router.delete('/all-articles/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.json({
                mylink: '/',

                user: (req.session.user === undefined ? "" : req.session.user)

            });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});

router.get('/edit-product/:id', (req, res) => {
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



router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

export default router;