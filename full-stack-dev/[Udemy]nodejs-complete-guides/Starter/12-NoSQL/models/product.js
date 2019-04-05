/* eslint-disable no-console */
const getDb = require("../util/database").getDb;

const mongoDb = require("mongodb");

class Product {
    constructor(title, description, price, imageUrl) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(results => {
                console.log(results);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then(products => {
                //console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(prodId) {
        const db = getDb();
        return db.collection("products")
            .find({ _id: new mongoDb.ObjectID(prodId)})
            .next() //cai cuoi
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static updateProd(prodId, prodNew) {
        const db = getDb();
        
        console.log("prodNew.title:", prodNew.title);
        
        return db.collection("products")
            .update({ 
                _id: new mongoDb.ObjectID(prodId)
            },
            {
                $set: {
                    title: prodNew.title,
                    description: prodNew.description,
                    price: prodNew.price,
                    imageUrl: prodNew.imageUrl
                }
            })
            .then(product => {
                //console.log("After update:", product)
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static deleteProd(prodId) {
        const db = getDb();
        
        return db.collection("products")
            .remove({ 
                _id: new mongoDb.ObjectID(prodId)
            })
            .then(results => {
                return results;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

// // Tao 1 model duoc quan li boi sequelize 
// const Product = sequelize.define("Product",{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

module.exports = Product;