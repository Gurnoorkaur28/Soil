module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/cart.controller.js");
  
  app.use(express.json());

//get all caartItems for specific id
  router.get("/:id", controller.all);
  //add tems to cart
  router.post("/:id/item",controller.addItem);
  //update items in cart
  router.put("/:id/item/:productId", controller.updateCartItemQuantity);
  //delete items from cart
  router.delete("/:id/item/:productId", controller.deleteCartItem);
  app.use("/api/cartItem", router);
};
