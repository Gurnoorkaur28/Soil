//code taken from workshop week08 activity1
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const { seedProducts, seedUsers } = require("./seedData");

const db = {
  Op: Sequelize.Op,
  sequelize: new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
  }),
};

// Models
db.product = require("./models/products.js")(db.sequelize, DataTypes);
db.user = require("./models/user.js")(db.sequelize, DataTypes);

// Sync and Seed Function
db.sync = async () => {
  await db.sequelize.sync({});

  await seedProducts(db);
  await seedUsers(db);
};

module.exports = db;
