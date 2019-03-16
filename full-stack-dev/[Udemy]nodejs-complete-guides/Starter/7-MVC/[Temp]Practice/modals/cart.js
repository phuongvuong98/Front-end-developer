const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'carts.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => find existing product
            // look up prod in products to have appriciately id 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add a new product / increase quantity
            if (existingProduct) {
                // ... operator means expand 1 array into multi components
                updatedProduct = { ...existingProduct
                };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    qty: 1
                };
                // if cart doesn't has product => add it into the bottom of array 
                cart.products = [...cart.products, updatedProduct];
            }
            // add plus in front of product price to convert that string to a number 
            cart.totalPrice = cart.totalPrice + +productPrice;
            console.log('In actually here!', id, productPrice);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        })

    }
}