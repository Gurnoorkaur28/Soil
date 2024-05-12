//code taken from workshop week08 activity1
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});
// Include models.
db.product = require("./models/products.js")(db.sequelize, DataTypes);
// Sync and Seed Function
db.sync = async () => {
  // Sync schema, possibly with force true to reset during development
  await db.sequelize.sync({ force: true }); // You can remove force: true in production

  // Seed users and products
  await seedData();
};

async function seedData() {
  // Seed products
  const productCount = await db.product.count();
  if (productCount === 0) {
    await db.product.bulkCreate([
      {
        id: 1,
        name: "mn",
        price: 3.5,
        description: "1 litre, Fresh Cow milk",
        image: "milk.png",
      },
      {
        id: 2,
        name: "Tomatoes",
        price: 4.0,
        description: "1kg, Juicy Tomatoes",
        image: "tomatoes.png",
      },
      {
        id: 3,
        name: "Carrots",
        price: 1.5,
        description: "1kg, Fresh Carrots",
        image: "carrot.png",
      },
      {
        id: 4,
        name: "Spinach",
        price: 2.0,
        description: "Per pack",
        image: "spinach.png",
      },
      {
        id: 5,
        name: "Broccoli",
        price: 2.5,
        description: "each",
        image: "broccoli.png",
      },
      {
        id: 6,
        name: "Potatoes",
        price: 5.5,
        description: "1 kg",
        image: "potatoes.png",
      },
      {
        id: 7,
        name: "Onions",
        price: 4.0,
        description: "Per kg",
        image: "onions.png",
      },
      {
        id: 8,
        name: "Soya Milk",
        price: 3.5,
        description: "1 litre (lactose free)",
        image: "soya-milk.png",
      },
      {
        id: 9,
        name: "Pulses",
        price: 4.0,
        description: "Per kg",
        image: "pulses.png",
      },
      {
        id: 10,
        name: "Flour",
        price: 4.9,
        description: "Per kg",
        image: "flour.png",
      },
      {
        id: 11,
        name: "Almond",
        price: 9.0,
        description: "Per kg",
        image: "almond.png",
      },
      {
        id: 12,
        name: "Eggs",
        price: 9.0,
        description: "12 Cage Free Eggs",
        image: "egg.png",
      },
      {
        id: 21,
        name: "Blueberries",
        description: "Special discount on blueberries!",
        price: 4.05,
        image: "Blueberries.png",
      },
      {
        id: 22,
        name: "Cottage Cheese",
        description: "Special offer on cottage cheese (per pack)",
        price: 5.55,
        image: "CottageCheese.png",
      },
      {
        id: 23,
        name: "Strawberries",
        description: "Special deal on strawberries!",
        price: 4.05,
        image: "Strawberries.png",
      },
      {
        id: 24,
        name: "Avocado",
        description: "Limited time offer on fresh avocados",
        price: 2.1,
        image: "Avocado.png",
      },
    
    ]);
  }
}

module.exports = db;
