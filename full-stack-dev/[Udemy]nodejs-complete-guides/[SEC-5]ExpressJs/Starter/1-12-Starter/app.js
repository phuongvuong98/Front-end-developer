const express = require('express');

// creates an Express Application. express() is a top-level function exported by express module.
const app = express();  

// app.use((req, res, next) => {
//     console.log("Into the middleware!");
//     next(); // allow the request to go the next middleware
// });

// app.use('/', (req, res, next) => {
//     console.log("Into the another middleware!");
//     res.send('<h1>Good Job!</h1>');
// });

app.use('/',(req, res, next) => {
    console.log('Create magic!');
    next();
});

app.use('/con-kax',(req, res, next) => {
    console.log('Into the middleware!');
    res.send('<h1>Con Kax!</h1>');
});

// run the function app.use if this path is started with '/'
app.use('/',(req, res, next) => {
    console.log('Into the middleware!');
    res.send('<h1>Good Job!</h1>');
});

app.listen(3000);