//code taken from workshop week08 activity1
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const { seedProducts } = require("./seedData");  // Make sure the path is correct

const db = {
  Op: Sequelize.Op,
  sequelize: new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
  })
};

// Include models
db.product = require("./models/products.js")(db.sequelize, DataTypes);

// Sync and Seed Function
db.sync = async () => {
  await db.sequelize.sync({ force: true });  // Consider environment-based logic for 'force'
  
  // Call the separate seed function
  await seedProducts(db);
};

module.exports = db;
