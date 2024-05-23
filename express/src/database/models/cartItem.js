module.exports = (sequelize, DataTypes) => 
    sequelize.define('cartItem', {

        cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'carts', // Name of the Cart model
        key: 'cart_id' 
         }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products', // Name of the Product model
                key: 'id', // Key in Product model that we're referencing
            }
            },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        
    }, {
        timestamps: false
      });
    
    
    
   
