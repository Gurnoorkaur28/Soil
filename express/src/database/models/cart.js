module.exports = (sequelize, DataTypes) =>
  sequelize.define("cart", {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
  });
