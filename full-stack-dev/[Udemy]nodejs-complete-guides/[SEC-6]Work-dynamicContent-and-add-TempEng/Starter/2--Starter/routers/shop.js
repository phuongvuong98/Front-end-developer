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

    console.log('[shop.js]:', adminData.products);

    res.sendFile(path.join( rootPath, 'views', 'shop.html'));
});

module.exports = router;