const express = require('express');

// this router is like a mini express app tied to other express app or pluggable into the other express app.
// plug into: acccess// tie means link, connect.
const router = express.Router();

// this path helps connect this file what you want.
const path = require('path');

const rootPath = require('../util/path');


const productsController = require('../controllers/products');

// => /admin/add-product vs GET method
// we don't execute the function so we don't add these parentheses => we just pass the reference to this function
// => we just tell express routers that it should take this function and store it and whenever a request reaches
// this route, it shoud go ahead and execute it.
router.get('/add-product', productsController.getAddProduct);

// => /admin/add-product vs POST method
router.post('/add-product', productsController.postAddProduct);

//module.exports = router;
exports.router = router;