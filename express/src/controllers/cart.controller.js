const db = require("../database");

//getting cart items for user 
exports.all = async (req, res) => {
  try {
    const userId = req.params.id;
    const userCart = await db.cart.findOne({
      where: { user_id: userId },
      include: [
        {
          model: db.cartItem,
          include: [db.product],
          include: [
            {
              model: db.product,
              include: [{
                model: db.specialProduct,
                required: false, // LEFT OUTER JOIN to include products even without special offers
                where: {
                  start_date: {
                    [db.Op.lte]: new Date() // Ensure the special is currently valid
                  },
                  end_date: {
                    [db.Op.gte]: new Date()
                  },
                }
              }]
            }
          ],
        },
      ],
    });

    if (!userCart) {
      // If the user doesn't have a cart, create a new one
      const newCart = await db.cart.create({ user_id: userId });
      res.json(newCart);
    } else {
      res.json(userCart);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart: " + error.message });
  }
};
//adding item to cart      
exports.addItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1; // Initial quantity should be one

    // Get the user's cart
    const userCart = await db.cart.findOne({ where: { user_id: userId } });

    if (!userCart) {
      return res.status(404).json({ message: "No cart found for this user." });
    }

    // Get the product object with the given productId
    const product = await db.product.findOne({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: "No product found with this id." });
    }

    // Check if the product already exists in the cart
    const existingCartItem = await db.cartItem.findOne({
      where: {
        cart_id: userCart.cart_id,
        productId: product.id,
      },
    });

    if (existingCartItem) {
      // If the product already exists, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.json(existingCartItem);
    } else {
      // If the product doesn't exist, create a new cart item
      const newCartItem = await db.cartItem.create({
        cart_id: userCart.cart_id,
        productId: product.id,
        quantity,
      });
      return res.json(newCartItem);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart: " + error.message });
  }
};

//u
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    // Check if productId and newQuantity are numbers
    // if (isNaN(productId)) {
     //return res.status(400).json({
     // error: {
      //code: 400,
     // message: "Invalid productId value.",
      //details: "Please provide a valid productId value.",
      
   // },
 // });
//}
    if (quantity<= 0) {
     return res.status(400).json({
    error: {
      code: 400,
      message: "Invalid newQuantity value.",
      details: "Please provide a positive newQuantity value.",
    },
  });
}

    // Get the user's cart
    const userCart = await db.cart.findOne({ where: { user_id: userId } });

    if (!userCart) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "You don't have a cart. Please create one to add items.",
        },
      });
    }

    
    // Find the cart item with the given cart_id and productId
      const cartItem = await db.cartItem.findOne({
      where: { cart_id: userCart.cart_id, productId: productId },
      });
       if (!cartItem) {
        return res.status(404).json({
         error: {
          code: 404,
          message: "No cart item found with this product id.",
        },
      });
    }

    // Update the quantity of the cart item
    try {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({
        error: {
          code: 500,
          message: "Failed to update cart item quantity.",
          details: error.message,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      error: {
        code: 500,
        message: "An unexpected error occurred.",
        details: error.message,
      },
    });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;

    // Check if productId is a number
    //if (isNaN(productId)) {
      //return res.status(400).json({
       // error: {
        //  code: 400,
         // message: "Invalid productId value.",
         // details: "Please provide a valid productId value.",
        //},
      //});
   // }

    // Get the user's cart
    const userCart = await db.cart.findOne({ where: { user_id: userId } });

    if (!userCart) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "You don't have a cart. Please create one to add items.",
        },
      });
    }

    // Find the cart item with the given cart_id and product_id
    const cartItem = await db.cartItem.findOne({
      where: { cart_id: userCart.cart_id, productId: productId },
    });

    if (!cartItem) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "No cart item found with this product id.",
        },
      });
    }

    // Delete the cart item
    await cartItem.destroy();

    res.json({ message: "Cart item deleted successfully." });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 500,
        message: "Failed to delete cart item.",
        details: error.message,
      },
    });
  }
};