const Product = require('../modals/product');

exports.getAddProduct = (req, res, next) => {
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
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();

    //products.push({title: req.body.title});
    //products.push({title: 1});
    //console.log(products);
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    //console.log(products);
    console.log(Product);
    Product.fetchAll(products => {
        res.render('ejs/shop.ejs', {prods : products, pageTitle: 'Shop', path: '/', hasProduct: products.length > 0,
        activeShop: true,
        activeProduct: false,
        formCSS: false,
        productCSS: true
        });
    });
}