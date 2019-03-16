/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
// truoc khi dong bo tat ca data ta define cho modal
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

const app = express();

// Tao middleware cho user khi da start thanh cong SERVER voi PORT
app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            // gan user(tu DB) cho req.user de luu user(mac dinh underfiled trong req).
            // tuc chuyen no thanh sequelize object
            // lay req.user(obj cua sequelize) de add-product (co kem userID)
            req.user = user;
            // chuyen den trang thai moi
            next();
        })
        .catch(err => console.log(err));
});

// Them templating engine de render html, css
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Truoc khi dong bo voi DB, thiet lap cac liet noi giua cac model
// User se duoc them vao Product
// CASCADE: khi xoa, se dc thuc thi den product, neu xoa user thi bat ki lien ket nao user cung bi xoa
// Product.belongsTo(User,...): sequelize tao method createProduct cho user
Product.belongsTo(User, {
    constraints: true,
    onDelete: "CASCADE"
});
User.hasMany(Product);

// Dung through de noi sequelize noi ma ket noi dc luu.
Product.belongsToMany(Cart, {
    through: CartItem
});
Cart.belongsToMany(Product, {
    through: CartItem
});

User.hasOne(Cart);
Cart.belongsTo(User);

// 1 user co nhieu ORDER
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {
    through: OrderItem
});

// Mot khi dong app, goi sync cua sequelize => no tim tat ca cac method define model va tao bang cho modal
// then force: true de chac chan dong bo chay lai het sau khi thay doi bang tuc overwrite(viet de len)==>
// can than viet de len mat het data cua cac bang khac(thao tac tren web luu data bi mat).
sequelize
    //.sync({force: true})
    .sync()
    // .then la 1 new PROMISE
    .then(() => {
        // tim user neu ko co user thi tao moi
        return User.findById(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: "VuongVuong",
                email: "vuonglegend@gmail.com"
            });
        }
        return user;
    })
    .then(user => {
        // khoi tao 1 cart duy nhat cho user 1
        return Cart.findAndCount({
            where: {
                UserId: user.id
            }
        })
            .then(result => {
                if (result.count == 0) {
                    return user.createCart();
                }
                return;
            })
            .catch(err => console.log(err));
    })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });