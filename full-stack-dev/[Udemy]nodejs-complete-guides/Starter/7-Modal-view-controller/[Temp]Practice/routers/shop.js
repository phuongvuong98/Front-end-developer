const express = require('express');

// create the mini app express 
const router = express.Router();

const rootPath = require('../util/path');

const adminRoute = require('./admin');
const shopController = require('../controllers/shop');

// run the function app.get if this path is '/' and method = get
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// extract that information through name (productId) with the name is up to you.
// you will careful if you use router.get('/products/delete'); because this line easyly is not received if
// this place is after router.get('/products/:productId', shopController.getProduct);
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;