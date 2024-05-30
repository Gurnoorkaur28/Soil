module.exports = (sequelize, DataTypes) => {
    return sequelize.define("specialProduct", {
      special_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
     
      discounted_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  };
  