const express = require('express');
// creates an Express Application. express() is a top-level function exported by express module.
const app = express();  
// creates bodyParser to parser data when submitted.
const bodyParser = require('body-parser');

// import mini app express
const adminRoute = require('./routers/admin');
const shopRouter = require('./routers/shop');

const cryptRouter = require('./routers/crypt');

const errorsController = require('./controllers/errors');

// by setting this special view engine configuration, a reserved configuration which is understood.
app.set('view engine', 'ejs');
// we alse tell expressjs where our views are to be found though that would be default setting here by away.
// you don't need to add this if you do use views folder.
app.set('views', 'views');

// import path to find file easily
const path = require('path');

// import path root
const rootPath = require('./util/path'); 

app.use(bodyParser.urlencoded({extended: true}));

// user should be able to access public folder and
app.use(express.static(path.join(rootPath, 'public')));


app.use('/admin', adminRoute.router);
app.use(shopRouter);


app.use(cryptRouter);



// if you don't use path, path will be '/' and don't care about method 
app.use(errorsController.getError404);

app.listen(3000);