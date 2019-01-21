const express = require('express');

// create the mini app express 
const router = express.Router();

const rootPath = require('../util/path');

const adminRoute = require('./admin');

const productsController = require('../controllers/products');

// run the function app.get if this path is '/' and method = get
router.get('/', productsController.getProducts);

module.exports = router;