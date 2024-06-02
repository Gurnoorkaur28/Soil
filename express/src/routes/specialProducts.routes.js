module.exports = (express, app) => {
  const router = express.Router();
  const specialProductController = require("../controllers/specialProducts.controller.js");

  router.get("/", specialProductController.all);
  router.post("/", specialProductController.create);

  app.use("/api/specialProducts", router);
};
