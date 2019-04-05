const express = require('express');

// create the mini app express 
const router = express.Router();

const rootPath = require('../util/path');

const cryptController = require('../controllers/crypt');


router.get('/cryptDES', cryptController.getDES);

router.post('/cryptDES', cryptController.postDES);

router.get('/cryptRSA', cryptController.getRSA);

router.get('/cryptAES', cryptController.getAES);

router.post('/cryptAES', cryptController.postAES);

module.exports = router;