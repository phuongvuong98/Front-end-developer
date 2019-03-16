// Viết hoa vì nó là class hay function constructor
const Sequelize = require('sequelize');

// Tạo 1 instance (1 mẫu) của Sequelize
const sequelize = new Sequelize('node-completed', 'root', 'phuongvuong', {
    host: 'localhost',
    dialect: 'mysql'
});

// Tức export trả về OBJECT trong cuối file JS và module chỉ module hiện tại trong file
module.exports = sequelize;