const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    // FIRST WAY 
    // Product.create({
    //     title: title,
    //     description: description,
    //     imageUrl: imageUrl,
    //     price: price,
    //     userId: req.user.id
    //   })
    //   .then(result => {
    //     console.log("[ADD PRODUCTS]==> OK");
    //     res.redirect("/");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // SECOND WAY
    // IMPORTANT
    req.user.createProduct({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
    })
        .then(() => {
            console.log("[ADD PRODUCTS]==> OK");
            res.redirect("/admin/products");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, _next) => {
    // nhan id de chinh sua
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;

    // req.user.getProducts tra ve mang product, USER 1 LAY RA CAC PRODUCT CUA NO
    req.user.getProducts({where: {id: prodId}})
    //Product.findById(prodId)
        .then(products => {
            console.log(products);
            const product = products[0];
            if (!product) {
                return res.redirect("/");
            }
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, _next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    // dung 2 promise rieng de tranh promise long nhau
    // vi sync nen no khong cho ma thuc hien tiep xuong duoi nen dat res.redirect('/admin/products');
    // sau khi da update thanh cong
    Product.findById(prodId)
        .then(product => {
            // sequelize co phuong thuc truy xuat cho product va save() de luu lai vao DB.
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDesc;

            return product.save();
        })
        .then(() => {
            console.log("OK");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));

};

exports.getProducts = (_req, res, _next) => {
    Product.findAll()
        .then(products => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products"
            });
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, _next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => product.destroy())
        .then(() => {
            console.log("OK");
            res.redirect("/admin/products");
        })
        .catch(err => console.log(err));
};