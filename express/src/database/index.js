//code taken from workshop week08 activity1
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const {
  seedProducts,
  seedSpecialProducts,
  seedUsers,
  seedCartItems,
  seedcart,
  seedreview,
} = require("./seedData");
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
db.specialProduct = require("./models/specialProducts.js")(
  db.sequelize,
  DataTypes
);
db.cartItem = require("./models/cartItem.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.review = require("./models/reviews.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes);

// Associations
//relating user and cart
db.user.hasOne(db.cart, { foreignKey: { name: "user_id", allowNull: false } });
db.cart.belongsTo(db.user, {
  foreignKey: { name: "user_id", allowNull: false },
});
//relating cart and cartItems
db.cart.hasMany(db.cartItem, { foreignKey: "cart_id" });
db.cartItem.belongsTo(db.cart, { foreignKey: "cart_id" });
//relating products and cartItems
db.product.hasMany(db.cartItem, { foreignKey: "productId" });
db.cartItem.belongsTo(db.product, { foreignKey: "productId" });
//reviews
//relating product and review
db.product.hasMany(db.review, { foreignKey: "productId" });
db.review.belongsTo(db.product, { foreignKey: "productId" });
//relating user and review
db.user.hasMany(db.review, { foreignKey: "user_id" });
db.review.belongsTo(db.user, { foreignKey: "user_id" });
// Relate specialProducts and products
db.product.hasMany(db.specialProduct, { foreignKey: "id" });
db.specialProduct.belongsTo(db.product, { foreignKey: "id" });
// Follow Associations
db.user.belongsToMany(db.user, {
  as: "Followers",
  through: db.follow,
  foreignKey: "followingId",
  otherKey: "followerId",
});

db.user.belongsToMany(db.user, {
  as: "Followings",
  through: db.follow,
  foreignKey: "followerId",
  otherKey: "followingId",
});

db.follow.belongsTo(db.user, { as: "Follower", foreignKey: "followerId" });
db.follow.belongsTo(db.user, { as: "Following", foreignKey: "followingId" });

// Sync and Seed Function
db.sync = async () => {
  await db.sequelize.sync();

  await seedProducts(db);
  await seedSpecialProducts(db);
  await seedUsers(db);
  await seedcart(db);
  await seedCartItems(db);
  await seedreview(db);
};

module.exports = db;
