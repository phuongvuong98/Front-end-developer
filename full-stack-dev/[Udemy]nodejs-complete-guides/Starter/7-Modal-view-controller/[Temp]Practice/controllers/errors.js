exports.getError404 = (req, res, next) => {
    //res.status(404).sendFile(path.join(rootPath, 'views', '404.html'));
    //res.status(404).render('404', {pageTitle: 'Path not found'}); => pug
    //res.status(404).render('hbs/404', {pageTitle: 'Path not found'}); => handlebars
    res.status(404).render('ejs/404', {
        pageTitle: 'Path not found',
        path:'/404'    
    }
    );
}