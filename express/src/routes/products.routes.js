module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/products.controller.js");

  // Endpoint to fetch all products
  router.get("/", controller.all);

  // Endpoint to create a new product
  router.post("/", controller.create);
  // Endpoint to find product by id
  router.get("/:id", controller.id);

  app.use("/api/products", router);
};
