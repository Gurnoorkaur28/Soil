module.exports = (express, app) => {
    const router = express.Router();
    const cartController = require("../controllers/cart.controller.js");
    const  authenticateUser = require("../controllers/authenticate.controller.js");
    app.use(express.json());


    router.get('/cart', authenticateUser, cartController.getUserCart);
    router.post('/cart/item', authenticateUser, cartController.addToCart);
    router.put('/cart/item', authenticateUser, cartController.updateCartItem);
    router.delete('/cart/item', authenticateUser, cartController.removeCartItem);
    router.post('/cart/complete', authenticateUser, cartController.completePurchase);
  

    app.use("/api/cartItem", router);
};

    

