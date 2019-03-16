// Viết hoa vì nó là class hay constructor function
const Sequelize = require("sequelize");

// Import vào 1 bể các ket noi duoc quan ly boi sequelize
const sequelize = require("../util/database");

// Tao 1 model duoc quan li boi sequelize 
const Product = sequelize.define("Product",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;