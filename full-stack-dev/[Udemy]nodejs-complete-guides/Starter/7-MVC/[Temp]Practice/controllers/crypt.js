const path = require('path');

// const p = path.join(path.dirname(process.mainModule.filename),
//     'data',
//     'products.json');


exports.getDES = (req, res, next) => {
    res.render('DES', {
        path: '/cryptDES'
    });
}

exports.postDES = (req, res, next) => {
    console.log(req.body.fileEn);
    console.log(req.body.fileKeyEn);
    const pathFileEn = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        req.body.fileEn
    );
    const pathFileKeyEn = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        req.body.fileKeyEn
    );

    // console.log("Vo nao babe1:", pathFileEn);
    // console.log("Vo nao babe2:", pathFileKeyEn);
    var PythonShell = require('python-shell');

    var options = {
        mode: 'text',
        //args: [pathFileEn, pathFileKeyEn, '--option=123']
        args: [pathFileEn, pathFileKeyEn]
    };


    PythonShell.run('python/hello.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
    

    res.render('DES', {
        path: '/cryptDES'
    });
}

exports.getRSA = (req, res, next) => {
    res.render('RSA', {
        path: '/cryptRSA'
    });
}
exports.getAES = (req, res, next) => {
    res.render('AES', {
        path: '/cryptAES'
    });
}

exports.postAES = (req, res, next) => {
    console.log(req.body.fileEn);
    console.log(req.body.fileKeyEn);
    const pathFileEn = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        req.body.fileEn
    );
    const pathFileKeyEn = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        req.body.fileKeyEn
    );

    // console.log("Vo nao babe1:", pathFileEn);
    // console.log("Vo nao babe2:", pathFileKeyEn);
    var PythonShell = require('python-shell');
    
    var options = {
        mode: 'text',
        //args: [pathFileEn, pathFileKeyEn, '--option=123']
        args: [pathFileEn, pathFileKeyEn]
    };


    PythonShell.run('python/AES.py', options, function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });
    
    res.render('AES', {
        path: '/cryptAES'
    });
}
 
// exports.getProduct = (req, res, next) => {
//     // params object received productId.
//     const prodId = req.params.productId;
//     Product.findById(prodId, product => {
//         //console.log(product);
//         res.render('shop/product-detail', {
//             pageTitle: product.title,
//             path: '/products',
//             product: product
//         })
//     });
// }

// exports.getIndex = (req, res, next) => {
//     //console.log(Product);
//     Product.fetchAll(products => {
//         res.render('shop/index', {
//             prods: products,
//             pageTitle: 'Shop',
//             path: '/'
//         });
//     });
// }
// exports.getCart = (req, res, next) => {
//     //console.log(Product);
//     Product.fetchAll(products => {
//         res.render('shop/cart', {
//             prods: products,
//             pageTitle: 'Your cart',
//             path: '/cart'
//         });
//     });
// }

// exports.postCart = (req, res, next) => {
//     // productId stores into name field of input (add to cart button)
//     const prodId = req.body.productId;
//     console.log("[prodId]:", prodId);
//     Product.findById(prodId, (product) => {
//         console.log("In here!", product.price);
//         Cart.addProduct(prodId, product.price);
//     })
//     res.redirect('/cart');
// }

// exports.getOrders = (req, res, next) => {
//     //console.log(Product);
//     Product.fetchAll(products => {
//         res.render('shop/orders', {
//             prods: products,
//             pageTitle: 'Your Orders',
//             path: '/orders',
//             hasProduct: products.length > 0,
//             formCSS: false,
//             productCSS: true
//         });
//     });
// }
// exports.getCheckout = (req, res, next) => {
//     //console.log(Product);
//     Product.fetchAll(products => {
//         res.render('shop/checkout', {
//             prods: products,
//             pageTitle: 'Shop',
//             path: '/checkout',
//             hasProduct: products.length > 0,
//             formCSS: false,
//             productCSS: true
//         });
//     });
// }