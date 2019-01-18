const express = require('express');
// creates an Express Application. express() is a top-level function exported by express module.
const app = express();  
// creates bodyParser to parser data when submitted.
const bodyParser = require('body-parser');

// import mini app express
const adminRouter = require('./routers/admin');
const shopRouter = require('./routers/shop');


// import path to find file easily
const path = require('path');

// import path root
const rootPath = require('./util/path'); 


// app.use((req, res, next) => {
//     console.log("Into the middleware!");
//     next();                     // allow the request to go the next middleware
// });

// app.use('/', (req, res, next) => {
//     console.log("Into the another middleware!");
//     res.send('<h1>Good Job!</h1>');
// });

app.use(bodyParser.urlencoded({extended: true}));
// user should be able to access public folder and
app.use(express.static(path.join(rootPath, 'public')));

app.use('/admin', adminRouter);
app.use(shopRouter);

// if you don't use path, path will be '/' and don't care about method 
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootPath, 'views', '404.html'));
});

app.listen(3000);