import HttpError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

// importing routes from files 
import index_router from "./routes/home.js";
import admin_user_management_router from "./routes/admin-user-management.js";
import admin_product_management_router from "./routes/admin-product-management.js";

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


index.use(logger("common"));
index.use(express.json());


index.use(express.urlencoded({ extended: true }));

//setup cookie parser middleware
index.use(cookieParser());

//setup static folder for serving static files in Express
index.use(express.sttic(path.join(__dirname, 'public')));


// routes setup (pls focus team while filling this )

index.use('/', index_router);
index.use('/admin-user-management', admin_user_management_router);
index.use('/admin-product-management', admin_product_management_router);



export default index;