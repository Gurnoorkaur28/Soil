module.exports = (sequelize, DataTypes) =>
  sequelize.define("products", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
   
  }, {
    timestamps: false
  });
