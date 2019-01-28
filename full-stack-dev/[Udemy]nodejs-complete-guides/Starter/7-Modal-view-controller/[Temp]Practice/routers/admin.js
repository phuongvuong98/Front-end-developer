const express = require('express');

// this router is like a mini express app tied to other express app or pluggable into the other express app.
// plug into: acccess// tie means link, connect.
const router = express.Router();

// this path helps connect this file what you want.
const path = require('path');

const rootPath = require('../util/path');

const adminController = require('../controllers/admin');

// => /admin/add-product vs GET method
// we don't execute the function so we don't add these parentheses => we just pass the reference to this function
// => we just tell express routers that it should take this function and store it and whenever a request reaches
// this route, it shoud go ahead and execute it.
router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/products', adminController.getProducts);


//module.exports = router;
exports.router = router;