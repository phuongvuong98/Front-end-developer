const Product = require('../modals/product');
const Cart = require('../modals/cart');

exports.getProducts = (req, res, next) => {
    //console.log(products);
    //console.log(Product);
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products'
        });
    });
}
 
exports.getProduct = (req, res, next) => {
    // params object received productId.
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        //console.log(product);
        res.render('shop/product-detail', {
            pageTitle: product.title,
            path: '/products',
            product: product
        })
    });
}

exports.getIndex = (req, res, next) => {
    //console.log(Product);
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
}
exports.getCart = (req, res, next) => {
    //console.log(Product);
    Product.fetchAll(products => {
        res.render('shop/cart', {
            prods: products,
            pageTitle: 'Your cart',
            path: '/cart'
        });
    });
}

exports.postCart = (req, res, next) => {
    // productId stores into name field of input (add to cart button)
    const prodId = req.body.productId;
    console.log("[prodId]:", prodId);
    Product.findById(prodId, (product) => {
        console.log("In here!", product.price);
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    //console.log(Product);
    Product.fetchAll(products => {
        res.render('shop/orders', {
            prods: products,
            pageTitle: 'Your Orders',
            path: '/orders',
            hasProduct: products.length > 0,
            formCSS: false,
            productCSS: true
        });
    });
}
exports.getCheckout = (req, res, next) => {
    //console.log(Product);
    Product.fetchAll(products => {
        res.render('shop/checkout', {
            prods: products,
            pageTitle: 'Shop',
            path: '/checkout',
            hasProduct: products.length > 0,
            formCSS: false,
            productCSS: true
        });
    });
}