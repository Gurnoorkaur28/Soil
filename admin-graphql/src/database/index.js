// Some Code/concept taken from RMIT - COSC2758 Wk10 Prac Code
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/products.js")(db.sequelize, DataTypes);
db.specialProduct = require("./models/specialProducts.js")(
  db.sequelize,
  DataTypes
);
db.review = require("./models/reviews.js")(db.sequelize, DataTypes);

// Association

// Prouct and Special
db.product.hasMany(db.specialProduct, { foreignKey: "id" });
db.specialProduct.belongsTo(db.product, { foreignKey: "id" });

// Product and Review
db.product.hasMany(db.review, { foreignKey: "productId" });
db.review.belongsTo(db.product, { foreignKey: "productId" });

// User and Review
db.user.hasMany(db.review, { foreignKey: "user_id" });
db.review.belongsTo(db.user, { foreignKey: "user_id" });

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

module.exports = db;
