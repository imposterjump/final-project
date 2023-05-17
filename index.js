import HttpError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";




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
import product_router from "./routes/product.js";
import cart_router from "./routes/cart.js";
import account_router from "./routes/account.js";
import about_router from "./routes/about.js";

// gettingg project path and displaying it 
export const __filename = fileURLToPath(
    import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);




// 
let index = express();


// setting where i am taking the views pages and setting views engine to ejs  
index.set('views', path.join(__dirname, "views"));
index.set("view engine", "ejs");

//
index.use(logger("common"));
index.use(express.json());
index.use(fileUpload());
//app.use(session({ secret: 'Your_Secret_Key' }));

index.use(express.urlencoded({ extended: true }));

//setup cookie parser middleware
index.use(cookieParser());

//setup static folder for serving static files in Express
index.use(express.static(path.join(__dirname, 'public')));


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
index.use('/product', product_router);


// infos pages and signup 
index.use('/signin', sign_in_router);
index.use('/signup', sign_up_router);
index.use('/account', account_router);
index.use('/cart', cart_router);


export default index;