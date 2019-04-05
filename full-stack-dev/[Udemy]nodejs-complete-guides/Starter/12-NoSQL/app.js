/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

// Tao middleware cho user khi da start thanh cong SERVER voi PORT
app.use((req, res, next) => {
    // User.findById(1)
    //     .then(user => {
    //         // gan user(tu DB) cho req.user de luu user(mac dinh underfiled trong req).
    //         // tuc chuyen no thanh sequelize object
    //         // lay req.user(obj cua sequelize) de add-product (co kem userID)
    //         req.user = user;
    //         // chuyen den trang thai moi
    //         next();
    //     })
    //     .catch(err => console.log(err));
    next(); // neu ko xai thi de rong no die
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


// callback la 1 ham nhan vao tham so la client_1
// mongoConnect((client_1) => {
//     console.log(client_1);
//     app.listen(3000);
// });

mongoConnect((db) => {
    //console.log("Ahihi");
    //console.log(db);
    app.listen(3000);
});