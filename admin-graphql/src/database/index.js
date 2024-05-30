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

// Association
db.product.hasMany(db.specialProduct, { foreignKey: "id" });
db.specialProduct.belongsTo(db.product, { foreignKey: "id" });

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

module.exports = db;
