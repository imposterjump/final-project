import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { createRequire } from 'module';
import Product from '../models/Product.js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const uploadPath = path.join(__dirname, '../public/uploads');

// Add Product Page - GET
router.get('/', (req, res) => {
  res.render('add-product');
});

// Add Product - POST
router.post('/', (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No file was uploaded.');
  }

  const imageFile = req.files.image;
  const fileName = req.body.itemName + path.extname(imageFile.name);
  const imagePath = path.join(uploadPath, fileName);
  if (!req.files || !req.files.image) {
    return res.status(400).send('No file was uploaded.');
  }

  imageFile.mv(imagePath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    const product = new Product({
      itemName: req.body.itemName,
      Sales: req.body.Sales,
      description: req.body.description,
      price_before: req.body.price_before,
      price_after: req.body.price_after,
      type: req.body.type,
      images: fileName, // Save the filename of the uploaded image
    });

    product
      .save()
      .then(result => {
        res.render('admin-product-management')
      })
      .catch(err => {
        console.error(err);
        res.redirect('/');
      });
  });
});

export default router;

