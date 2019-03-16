const Product = require('../modals/product');

exports.getAddProduct = (req, res, next) => {
    //#region sendFile normal and use hug, handlebars
    // use path because you don't care format in OS which is MAC OS or WIN
    // __dirname: this is a global variable which simply holds the absolute path on our OS.
    // don't use slash('/') because path automatic join any thinh you path.
    //res.sendFile(path.join( rootPath, 'views', 'add-product.html'));

    //res.render('pug/add-product', {pageTitle: "Add product", path: '/admin/add-product'} => pug
    // res.render('hbs/add-product', {pageTitle: "Add product", path: '/admin/add-product',
    //     activeShop: false,
    //     activeProduct: true,
    //     formCSS: true,
    //     productCSS: true
    // }) 
    //#endregion 
    // we did install ejs and then you always just refer to the name of your view
    res.render('admin/edit-product', {
        pageTitle: "Add product",
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    // construct product by exactly name field in input or textarea
    const title = req.body.title;
    const imgURL = req.body.imageURL;
    const price = req.body.price;
    const des = req.body.description;

    const product = new Product(null, title, imgURL, des, price);
    product.save();
	//console.log('TCL: exports.postAddProduct -> product', product)

    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    // the extracted value always is a string ! So 'true' instead of true
    const editMode = req.query.edit;
    console.log('[editMode]:',editMode);
    if (!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if (!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: "Edit product",
            path: '/admin/edit-product',
            // to ensuring that people have to pass query paramater in url
            // query paramater can be added to any url by adding question mark and
            // then a key value pair separated by an equal sign
            // ex: /?edit=true
            // => This is a so-called optional data.
            editing: editMode,
            product: product
        })
    })
}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imgURL = req.body.imageURL;
    const price = req.body.price;
    const des = req.body.description;
	//console.log('TCL: exports.postEditProduct -> des', des)

    const product = new Product(id, title, imgURL, des, price);
    product.save();

    res.redirect('/products');
}

exports.postDeleteProduct = (req, res, next) => {
    //console.log("[Test delete1]:", req.body.productId);
    Product.delete(req.body.productId);
    res.redirect('products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
            hasProduct: products.length > 0,
            formCSS: false,
            productCSS: true
        });
    });
}