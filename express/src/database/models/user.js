// Code/concept taken from RMIT - COSC2758 Wk8 Lec Code - Example 3
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      join_date: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
