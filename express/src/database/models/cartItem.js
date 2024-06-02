module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "cartItem",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "carts",
          key: "cart_id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
    }
  );
