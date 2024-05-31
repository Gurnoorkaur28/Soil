module.exports = (sequelize, DataTypes) =>
  sequelize.define("follow", {
    followerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    followingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  }, {
    timestamps: false,
  });
