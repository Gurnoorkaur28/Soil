module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: {
        isWithinWordLimit(value) {
          if (value) {
            const wordCount = value.split(/\s+/).length;
            if (wordCount > 100) {
              throw new Error('Comment should not exceed 100 words.');
            }
          }
        },
      },
    },

  
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: false,
});





