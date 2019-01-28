const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) cb([]);
        // take incomeing json and give us back a js array
        cb(JSON.parse(fileContent));
    })
}

module.exports = class Product {
    constructor(id, t, imageURL, description, price) {
        this.id = id;
        this.title = t;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
    save() {
        getProductsFromFile(products => {
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                
                fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
                    console.log('[Error]:', err);
                })
            } else {
                this.id = Math.random().toString();
                //#region Another way
                // this.balbla helps us to create new field in class.
                // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

                // fs.readFile(p, (err, data) => {
                //     let products = [];
                //     if (!err) {
                //         // take incomeing json and give us back a js array
                //         products = JSON.parse(data); // convert to array
                //     }
                //     // this will refer to the object based on the class
                //     products.push(this);

                //     fs.writeFile(p, JSON.stringify(products), (err) => {
                //         console.log("[Wrote]");
                //         console.log(err);
                //     })
                // })
                //#endregion
                // this will refer to the object based on the class
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log("[Error]:", err);
                })
            }
        })
    }

    // this is not called on a single instance of the product because it 
    // should fetch all products
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        })
    }
}