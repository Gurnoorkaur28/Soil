//code taken from workshop week08 activity1
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const { seedProducts, seedSpecialProducts, seedUsers } = require("./seedData");
const db = {
  Op: Sequelize.Op,
  sequelize: new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
  }),
};

// Models
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/products.js")(db.sequelize, DataTypes);
// db.specialProduct = require("./models/specialProducts.js")(
//   db.sequelize,
//   DataTypes
// );

// Relate specialProducts and products
// db.product.hasMany(db.specialProduct, { foreignKey: "id" });
// db.specialProduct.belongsTo(db.product, { foreignKey: "id" });

// Sync and Seed Function
db.sync = async () => {
  await db.sequelize.sync();

  await seedProducts(db);
  // await seedSpecialProducts(db);
  await seedUsers(db);
};

module.exports = db;
