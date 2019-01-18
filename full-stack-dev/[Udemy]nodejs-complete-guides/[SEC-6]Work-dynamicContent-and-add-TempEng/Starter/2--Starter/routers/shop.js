const express = require('express');

// create the mini app express 
const router = express.Router();

const rootPath = require('../util/path');

const adminData = require('./admin');

const path = require('path');

// run the function app.get if this path is '/' and method = get
router.get('/',(req, res, next) => {
       // use path because you don't care format in OS which is MAC OS or WIN
    // __dirname: this is a global variable which simply holds the absolute path on our OS.
    // don't use slash('/') because path automatic join any thinh you path. 
    //console.log('[shop.js]:', adminData.products); // share product across user and page.
    //res.sendFile(path.join( rootPath, 'views', 'shop.html'));
    const products = adminData.products;
    console.log(products);
    //res.render('pug/shop', {prods : products, pageTitle: 'Shop', path: '/'}); // use render template which declared => pug 
    // res.render('hbs/shop', {prods : products, pageTitle: 'Shop', path: '/', hasProduct: products.length > 0,
    //     activeShop: true,
    //     activeProduct: false,
    //     formCSS: false,
    //     productCSS: true
    // }); // use render template which declared => handlebars

    res.render('ejs/shop.ejs', {prods : products, pageTitle: 'Shop', path: '/', hasProduct: products.length > 0,
        activeShop: true,
        activeProduct: false,
        formCSS: false,
        productCSS: true
    });
});

module.exports = router;