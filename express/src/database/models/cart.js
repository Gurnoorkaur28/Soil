module.exports = (sequelize, DataTypes) =>
  sequelize.define("cart", {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // email: {
    //     type: DataTypes.STRING(32),
    //   allowNull: false,
    //   references: {
    //     model: 'users',
    //     key: 'email',
    //   },
    // },
    
  });
