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
  filename: function (req, file, cb) {
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



// Routes
router.get('/', (req, res) => {
  res.render('admin-product-management');
});





router.get('/all-articles/:id', (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      res.render('details', { product });
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
      res.json({ mylink: '/' });
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
      res.render('edit', { product });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

router.post('/edit-product/:id', upload.single('image'), (req, res) => {
  const productId = req.params.id;
  const { itemName, Sales, description, price_before, price_after, type, images } = req.body;

  // Update the product information
  const updatedProduct = {
    itemName,
    Sales,
    description,
    price_before,
    price_after,
    type,
    images
  };

  // Check if a new image file was uploaded
  if (req.file) {
    // Include the new image path in the updated product
    updatedProduct.images = req.file.filename;
  }

  Product.findByIdAndUpdate(
    productId,
    updatedProduct,
    { new: true }
  )
    .then((updatedProduct) => {
      console.log('Product updated:', updatedProduct);
      res.redirect(`/all-articles/${productId}`);
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
