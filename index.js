import HttpError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import users from "./models/users.js"
import mongoose from 'mongoose';
import session from 'express-session';




// importing routes from files 
import home_router from "./routes/home.js";
import admin_user_management_router from "./routes/admin-user-management.js";
import admin_product_management_router from "./routes/admin-product-management.js";
import jackets_router from "./routes/jackets.js";
import admin_homepage_router from "./routes/admin-homepage.js";
import tops_router from "./routes/tops.js";
import accessories_router from "./routes/accessories.js";
import bottoms_router from "./routes/bottoms.js";
import sign_in_router from "./routes/sign-in.js";
import sign_up_router from "./routes/sign-up.js";
import cart_router from "./routes/cart.js";
import account_router from "./routes/account.js";
import about_router from "./routes/about.js";
import help_router from "./routes/help.js";
import add_product_router from "./routes/add-product.js";
import edit_router from "./routes/edit.js";
import details_router from "./routes/details.js";
import vproducts_router from "./routes/vproducts.js";
import Product from './models/Product.js';
const index = express();
export const __filename = fileURLToPath(
    import.meta.url);
export const __dirname = path.dirname(__filename);
// Middleware
index.use(express.urlencoded({ extended: false }));
// setting where i am taking the views pages and setting views engine to ejs  
index.set('views', path.join(__dirname, "views"));
index.set("view engine", "ejs");
// gettingg project path and displaying it 

//
index.use(logger("common"));
index.use(express.json());
index.use(fileUpload());

index.use(session({ secret: 'Your_Secret_Key' }));

//setup cookie parser middleware
index.use(cookieParser());

//setup static folder for serving static files in Express
index.use(express.static(path.join(__dirname, 'public')));



//db
console.log(`Project Root dir : ${__dirname}`);
mongoose.connect('mongodb+srv://boomy:25102002@cluster0.lfldchi.mongodb.net/projectdatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });



index.get('/details/:id', (req, res) => {
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
index.delete('/details/:id', (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.json({ mylink: '/vproducts' });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
});


// Edit Product Page - GET
index.get('/edit-product/:id', (req, res) => {
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
// Edit Product Page - POST
index.post('/edit-product/:id', function(req, res, next) {

    let imgFile;
    let uploadPath;
    console.log(__dirname + '/public/uploads/');
    console.log(req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    imgFile = req.files && req.files.image;
    uploadPath = __dirname + '/public/uploads/' + req.body.title + path.extname(imgFile.name)
    console.log(uploadPath)
    console.log(req.body)
        // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        const id = req.params.id

        const pro = ({
            itemName: req.body.itemName,
            Sales: req.body.Sales,
            description: req.body.description,
            price_before: req.body.price_before,
            price_after: req.body.price_after,
            type: req.body.type,
            images: req.body.i + path.extname(imgFile.name),

        });



        Product.findByIdAndUpdate(id, pro)
            .then(result => {

                console.log(result)
                res.redirect('/vproducts');

            })
            .catch(err => {
                console.log(err);
            });
    });

});



// routes setup (pls focus team while filling this )
//home and about pages
index.use('/', home_router);
index.use('/about', about_router);

//admin pages
index.use('/admin-homepage', admin_homepage_router);
index.use('/admin-user-management', admin_user_management_router);
index.use('/admin-product-management', admin_product_management_router);

//categories pages and product pages 
index.use('/jackets', jackets_router);
index.use('/tops', tops_router);
index.use('/bottoms', bottoms_router);
index.use('/accessories', accessories_router);



// infos pages and signup 
index.use('/signin', sign_in_router);
index.use('/signup', sign_up_router);
index.use('/account', account_router);
index.use('/cart', cart_router);
index.use('/help', help_router);
//product
index.use('/add-product', add_product_router);
index.use('/edit', edit_router);
index.use('/details', details_router);
index.use('/vproducts', vproducts_router);
//port
// 404 page
index.use((req, res) => {
    res.status(404).send('404  page not found ' /*, { user: (req.session.user === undefined ? "" : req.session.user) }*/ );


});

const port = 3000;


index.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default index;