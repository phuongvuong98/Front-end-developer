const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    save() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json'); 
        
        fs.readFile(p, (err, data) => {
            let products = [];
            if(!err){
                // take incomeing json and give us back a js array
                products = JSON.parse(data); // convert to array
            }
            // this will refer to the object based on the class
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log("[Wrote]");
                console.log(err);
            })
        })
    }

    // this is not called on a single instance of the product because it 
    // should fetch all products
    static fetchAll(cb) {
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json'); 
        fs.readFile(p, (err, data) => {
            if (err){
                cb([]);
            }
            cb(JSON.parse(data));
        })
        //return products;
    }
}