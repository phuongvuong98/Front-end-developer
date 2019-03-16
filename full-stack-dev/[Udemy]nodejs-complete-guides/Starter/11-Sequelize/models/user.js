// Viet hoa vi no la class hay function constructor
const Sequelize =  require("sequelize");

// Di vao 1 be cac ket noi trong DB dc sequelize quan li
const sequelize = require("../util/database");

// Tao 1 model duoc quan li boi Sequelize
// dung method define tao bang va fields
const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});

module.exports = User;
