/* eslint-disable no-undef */
const Product = require("../models/product");

// User duoc tao ra tu models/user de thuc hien cau leng tao bang thong qua method sync o app.js
// const User = require("../models/user");

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            console.log("[GET ALL PRODUCT]==> OK");
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;

    // Sequelize co .findById tra ve 1 product duy nhat
    Product.findById(prodId)
        .then((product) => {
            console.log("[GET DETAILED PRODUCT]==> OK");
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products"
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            console.log("[CHECK ALL PROD]==> OK");
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/"
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render("shop/cart", {
                        path: "/cart",
                        pageTitle: "Your Cart",
                        products: products
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
    // Cart.getCart(cart => {
    //   Product.fetchAll(products => {
    //     const cartProducts = [];
    //     for (product of products) {
    //       const cartProductData = cart.products.find(
    //         prod => prod.id === product.id
    //       );

    //       if (cartProductData) {
    //         cartProducts.push({ productData: product, qty: cartProductData.qty });
    //       }
    //     }
    //     res.render('shop/cart', {
    //       path: '/cart',
    //       pageTitle: 'Your Cart',
    //       products: cartProducts
    //     });
    //   });
    // });
};

// them san pham voi vao cart 
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            // truy cap vao dung cart dung user va kiem tra product
            fetchCart = cart;
            return cart.getProducts({where: {id : prodId}});
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                newQuantity = product.CartItem.quantity + 1;
                return product;
            }
            return Product.findById(prodId);
        })
        .then(product => {
            // them product vao cart chung
            return fetchCart.addProduct(product, {
                through: { quantity: newQuantity }
            });
        })
        .then(() => {
            res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            // cart.getProducts tra ve 1 mang ko co cart.getProduct
            return cart.getProducts({where: { id: prodId }});
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            // xoa product trong cart bang cach vao cartitem va goi destroy()
            return product.CartItem.destroy();
        })
        .then(() => {
            res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postCreateOrder = (req, res, next) => {
    let fetchedCart;
    // truy cap vao 1 user
    req.user
        // lay cart cua user do
        .getCart()
        .then(cart => {
            fetchedCard = cart;
            return cart.getProducts();
        })
        // truy cap vao product cua cart do 
        .then(products => {
            // tao bang order cho user
            req.user.createOrder()
                .then(order => {
                    // Them tung product cu the voi quantity cu the
                    return order.addProducts(
                        products.map(product => {
                            product.OrderItem = { quantity : product.CartItem.quantity };
                            return product;
                        }) 
                    );
                });
        })
        .then(() => {
            //cart.setProducts(null);
            return res.redirect("/orders");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOrders = (req, res, next) => {
    req.user
        // truy cap bang product trong cart (1 user co nhieu ORDER)
        .getOrders({include: [{
            model: Product
        }]})
        .then(orders => {
            // console.log("CONKAX1:", orders);
            // console.log("CONKAX2:", orders[0].id);
            // console.log("CONKAX3:", orders.length);
            // console.log("CONKAX4:", orders[0].Products);
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders
            });
        })
        .catch(err => {
            console.log(err);
        });
};