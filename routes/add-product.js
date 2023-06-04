import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { createRequire } from 'module';
import Product from '../models/Product.js';

const require = createRequire(
    import.meta.url);
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const uploadPath = path.join(__dirname, '../public/uploads');


// Add Product Page - GET
router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    } else {
        res.render('err', { err: 'You are not an Admin', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get('/', (req, res) => {
    res.render('add-product');
});

router.post('/', (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No files were uploaded.');
    }

    const imageFiles = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
    const productData = req.body;

    const savePromises = imageFiles.map((imageFile, index) => {
        let fileName;
        if (index === 0) {
            fileName = productData.itemName + path.extname(imageFile.name);
        } else if (index === 1) {
            fileName = productData.itemName + 'sec' + path.extname(imageFile.name);
        } else {
            // Handle additional images as needed
            // Set the desired filename based on your requirements
        }

        const imagePath = path.join(uploadPath, fileName);

        return new Promise((resolve, reject) => {
            imageFile.mv(imagePath, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(fileName);
                }
            });
        });
    });

    Promise.all(savePromises)
        .then((fileNames) => {
            const product = new Product({
                itemName: productData.itemName,
                Sales: productData.Sales,
                description: productData.description,
                price_before: productData.price_before,
                price_after: productData.price_after,
                type: productData.type,
                images: fileNames,
            });

            return product.save();
        })
        .then((result) => {
            res.render('admin-product-management');
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/');
        });
});

export default router;