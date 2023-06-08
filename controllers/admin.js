import Product from '../models/Product.js';
import bcrypt from "bcrypt";
import pkg from 'url/util.js';
import users from '../models/users.js';
import path from "path";

import Order from '../models/order.js';

const { isNullOrUndefined } = pkg;












const get_add_product_page = (req, res) => {
    res.render('add-product', {
        user: (req.session.user === undefined ? "" : req.session.user)
    });
}
const add_product = (req, res) => {
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
            res.render('admin-product-management', {
                user: (req.session.user === undefined ? "" : req.session.user)
            });
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/');
        });
}
const get_admin_home_page = function(req, res, next) {

    Product.find()
        .then(products => {
            users.find()
                .then(users => {
                    Order.find()
                        .then(orders => {
                                // Render your dashboard view and pass the number of visitors
                                res.render('adminhome', {
                                    products: products,
                                    users: users,
                                    orders: orders,
                                    user: (req.session.user === undefined ? "" : req.session.user),
                                    numberOfvisitors: "could not get "
                                });
                            }

                        )
                        .catch(err => {
                            console.log(err);
                            res.status(500).send("An error occurred while retrieving orders.");
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send("An error occurred while retrieving users.");
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("An error occurred while retrieving products.");    
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("An error occurred while retrieving products.");
        });
}





const get_admin_product_page = (req, res) => {
    res.render('admin-product-management', {
        user: (req.session.user === undefined ? "" : req.session.user)

    });
}
const get_product_details = (req, res) => {
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
}
const admin_delete_product = (req, res) => {
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
}
const get_product_edit_Page = (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('edit', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}
const edit_product =
    (req, res) => {
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
                updatedProduct, { new: true }
            )
            .then((updatedProduct) => {
                console.log('Product updated:', updatedProduct);
                res.redirect(`/all-articles/${productId}`);
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/');
            });
    };
const get_admin_user_page = function(req, res, next) {

    users.find()
        .then(result => {
            console.log(result);
            res.render('admin_user_controls', {
                users: result,
                TITLE: 'SIGNUP PAGE',
                message: '',
                user: (req.session.user === undefined ? "" : req.session.user)



            });

        })
        .catch(err => {
            console.log(err);
        });


}
const admin_user_search = function(req, res, next) {

    console.log(req.body.search_bar_users);
    if (req.body.search_bar_users == "" || req.body.search_bar_users == null) {
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: '', user: (req.session.user === undefined ? "" : req.session.user) });
                // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
            })
            .catch(err => {
                console.log(err);
            });

    } else {
        var query = { username: req.body.search_bar_users };
        users.find(query)
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: '', user: (req.session.user === undefined ? "" : req.session.user) });
                // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
            })
            .catch(err => {
                console.log(err);
            });

    }





}
const admin_edit_user_infos = function(req, res, next) {



    const default_type = "user";
    let counter = "a";

    console.log("infos : " + " username:" +
        req.body.username + " pass:" + req.body.pw + " conf pass:" + req.body.cpw + " email:" + req.body.email + " phone:" + req.body.phone);

    if (req.body.pw == "" || req.body.cpw == "" || +req.body.email == "" || req.body.phone == "") {
        counter = false;
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'please you have to fill all the information ', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });


    } else if (req.body.pw != req.body.cpw) {
        counter = "b";
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'the passwords doesnt match pls try again ', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });


    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false) {
        counter = "b";
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'the email is invalid please try again', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });


    } else if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.phone) == false) {
        counter = "b";
        users.find()
            .then(result => {
                console.log(result);
                res.render('admin_user_controls', { users: result, message: 'the phone number is invalid pls try again ', user: (req.session.user === undefined ? "" : req.session.user) });

            })
            .catch(err => {
                console.log(err);
            });

    } else {



        const SALT_ROUNDS = 10;

        users.findByIdAndUpdate(req.params.id, {


                password: bcrypt.hashSync(req.body.pw, SALT_ROUNDS),

                type: default_type,
                email: req.body.email,
                phone_number: req.body.phone
            })
            .then(result => {
                res.redirect('/admin-user-management');
            })
            .catch(err => {
                console.log(err);
            });
    }

}
const delete_user = function(req, res, next) {

    users.findOneAndDelete({ username: req.params.username }).then(result => {

            console.log(result);
            res.redirect('/admin-user-management');

        })
        .catch(err => {
            console.log(err);
        });
}

const admin_add_user = (req, res) => {


    let counter = "a";



    console.log("infos : " + " username:" +
        req.body.username + " pass:" + req.body.pw + " conf pass:" + req.body.cpw + " email:" + req.body.email + " phone:" + req.body.phone + " type : " + req.body.type);

    if (req.body.username == "" || req.body.pw == "" || req.body.cpw == "" || +req.body.email == "" || req.body.phone == "" || req.body.type == "") {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'Fill all fields ',
            user: (req.session.user === undefined ? "" : req.session.user)

        });

    } else if (req.body.pw != req.body.cpw) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'The password and confirmation password do not match.',
            user: (req.session.user === undefined ? "" : req.session.user)

        });

    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) == false) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'Email invalid. Please try again',
            user: (req.session.user === undefined ? "" : req.session.user)

        });


    } else if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.phone) == false) {
        counter = "b";
        res.render('signup', {
            TITLE: 'SIGNUP PAGE',
            message: 'Phone number invalid. Please try again',
            user: (req.session.user === undefined ? "" : req.session.user)

        });
    } else {


        var query = { username: req.body.username };

        users.find(query).then(result => {
                console.log(result);


                if (result != "") {


                    counter = "b";

                    res.render('signup', {
                        TITLE: 'SIGNUP PAGE',
                        message: 'Username already exists',
                        user: (req.session.user === undefined ? "" : req.session.user)





                    });


                } else {

                    const default_type = req.body.type;

                    const SALT_ROUNDS = 10;

                    const user = new users({
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.pw, SALT_ROUNDS),

                        type: default_type,
                        email: req.body.email,
                        phone_number: req.body.phone
                    });
                    user.save()
                        .then(result => {
                            console.log(result + "added user");
                            users.find()
                                .then(result => {
                                    console.log(result);
                                    res.render('admin_user_controls', { users: result, message: '', user: (req.session.user === undefined ? "" : req.session.user) });
                                    // res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        })
                        .catch(err => {
                            console.log(err);

                        });

                }


            })
            .catch(err => {
                console.log(err);
            });





    }



}
const admin_display_product_details = (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('details', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}
const delete_product = (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then(() => {
            res.json({ mylink: '/vproducts', user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}

const get_product_edit_page = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
        .then((product) => {
            res.render('edit', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}
const admin_edit_product = async(req, res, next) => {
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
}
const admin_display_all_products = (req, res) => {
    Product.find()
        .then((result) => {
            res.render('vproducts', { arrproduct: result, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}
const admin_item_details = (req, res) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then((product) => {
            res.render('details', { product, user: (req.session.user === undefined ? "" : req.session.user) });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}


export default {
    get_add_product_page,
    add_product,
    get_admin_home_page,
    get_admin_product_page,
    get_product_details,
    admin_delete_product,
    get_product_edit_Page,
    edit_product,
    get_admin_user_page,
    admin_user_search,
    admin_edit_user_infos,
    delete_user,
    admin_add_user,
    admin_display_product_details,
    delete_product,
    get_product_edit_page,
    admin_edit_product,
    admin_display_all_products,
    admin_item_details
}