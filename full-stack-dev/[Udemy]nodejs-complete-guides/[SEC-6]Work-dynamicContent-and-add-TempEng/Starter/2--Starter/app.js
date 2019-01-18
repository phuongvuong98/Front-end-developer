const express = require('express');
// creates an Express Application. express() is a top-level function exported by express module.
const app = express();  
// creates bodyParser to parser data when submitted.
const bodyParser = require('body-parser');

// import mini app express
const adminData = require('./routers/admin');
const shopRouter = require('./routers/shop');


// we did install express handlebars but this actually is a package that not auto-installed by express
// so instead we manually have to tell express that there is such an express handlebars engine available.
const expressHbs = require('express-handlebars');


// now we have to tell express that this exists
// we call engine method and this registers a new templating engine  
// in case we're using one which is not built-in, the pug was built-in kind of,
// express-handlebars is not.
// arg1: name what you want
// arg2: tool you use, that turns out to be a function
// returns the intialised view engine
// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs');
// app.set('views', 'views');



// view engine allow us to tell express hey for any dynamic templates we're trying to render
// and there will be special function
// app.set('view engine', 'pug');
// app.set('views', 'views');


// by setting this special view engine configuration, a reserved configuration which is understood.
app.set('view engine', 'ejs');
// we alse tell expressjs where our views are to be found though that would be default setting here by away.
// you don't need to add this if you do use views folder.
app.set('views', 'views');

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


app.use('/admin', adminData.router);
app.use(shopRouter);

// if you don't use path, path will be '/' and don't care about method 
app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(rootPath, 'views', '404.html'));
    //res.status(404).render('404', {pageTitle: 'Path not found'}); => pug
    //res.status(404).render('hbs/404', {pageTitle: 'Path not found'}); => handlebars
    res.status(404).render('ejs/404.ejs', {pageTitle: 'Path not found',
        activeShop: false,
        activeProduct: false}
    );
});

app.listen(3000);