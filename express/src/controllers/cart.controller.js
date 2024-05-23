const db = require("../database");
const Cart = db.cart;
const CartItem = db.cartItem;
const Product = db.product;
const User = db.user;

// Get the user's cart
exports.getUserCart = async (req, res) => {
  try {
    const { email } = req.user; // Assuming req.user is set by authentication middleware
    const cart = await Cart.findOne({
      where: { email },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
              attributes: ['name', 'description', 'price', 'image']
            }
          ]
        }
      ]
    });

    if (!cart) {
      return res.status(404).send("No cart found for this user.");
    }

    res.json(cart);
  } catch (error) {
    res.status(500).send("Failed to fetch cart: " + error.message);
  }
};

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { email } = req.user; // Assuming req.user is set by authentication middleware
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ where: { email } });
    if (!cart) {
      cart = await Cart.create({ email });
    }

    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.cart_id, productId }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart_id: cart.cart_id,
        productId,
        quantity
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).send("Failed to add item to cart: " + error.message);
  }
};

// Update the quantity of an item in the cart
exports.updateCartItem = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;

    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).send({ message: "CartItem not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).send(cartItem);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.body;

    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      return res.status(404).send({ message: "CartItem not found" });
    }

    await cartItem.destroy();
    res.status(200).send({ message: "CartItem removed" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Complete purchase
exports.completePurchase = async (req, res) => {
  try {
    const { email } = req.user; // Assuming req.user is set by authentication middleware
    const cart = await Cart.findOne({ where: { email } });

    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    const cartItems = await CartItem.findAll({ where: { cart_id: cart.cart_id } });
    if (cartItems.length === 0) {
      return res.status(400).send('Cart is empty');
    }

    // Implement purchase logic here (e.g., charge the user, update inventory)
    
    // Clear the cart
    await CartItem.destroy({ where: { cart_id: cart.cart_id } });
    res.send('Purchase completed');
  } catch (error) {
    res.status(500).send('Failed to complete purchase: ' + error.message);
  }
};
