const express = require('express');

// this router is like a mini express app tied to other express app or pluggable into the other express app.
// plug into: acccess// tie means link, connect.
const router = express.Router();

// this path helps connect this file what you want.
const path = require('path');

const rootPath = require('../util/path');

//global products
const products = [];

// => /admin/add-product vs GET method
router.get('/add-product',(req, res, next) => {
    // use path because you don't care format in OS which is MAC OS or WIN
    // __dirname: this is a global variable which simply holds the absolute path on our OS.
    // don't use slash('/') because path automatic join any thinh you path.
    //res.sendFile(path.join( rootPath, 'views', 'add-product.html'));

    //res.render('pug/add-product', {pageTitle: "Add product", path: '/admin/add-product'} => pug
    // res.render('hbs/add-product', {pageTitle: "Add product", path: '/admin/add-product',
    //     activeShop: false,
    //     activeProduct: true,
    //     formCSS: true,
    //     productCSS: true
    // }) 
    


    // we did install ejs and then you always just refer to the name of your view
    res.render('ejs/add-product.ejs', {pageTitle: "Add product", path: '/admin/add-product',
        activeShop: false,
        activeProduct: true,
        formCSS: true,
        productCSS: true
    }) 

});

// => /admin/add-product vs POST method
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    //products.push({title: 1});
    console.log(products);
    res.redirect('/');
})

//module.exports = router;
exports.router = router;
exports.products = products;