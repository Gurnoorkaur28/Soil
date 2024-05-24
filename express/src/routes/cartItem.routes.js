module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/cart.controller.js");
  // const  authenticateUser = require("../controllers/authenticate.controller.js");
  app.use(express.json());

  // router.get('/', authenticateUser, cartController.getUserCart);
  // router.post('/cart/item', authenticateUser, cartController.addToCart);
  // router.put('/cart/item', authenticateUser, cartController.updateCartItem);
  // router.delete('/cart/item', authenticateUser, cartController.removeCartItem);
  // router.post('/cart/complete', authenticateUser, cartController.completePurchase);
  router.get("/:id", controller.all);
  //   router.post("/cart/item", cartController.addToCart);
  //   router.put("/cart/item", cartController.updateCartItem);
  //   router.delete("/cart/item", cartController.removeCartItem);
  //   router.post("/cart/complete", cartController.completePurchase);

  app.use("/api/cartItem", router);
};
