module.exports = (express, app) => {
    const router = express.Router();
    const controller = require("../controllers/products.controller.js");

    // Endpoint to fetch all products
    router.get("/", controller.all);

    // Endpoint to create a new product
    router.post("/", controller.create);

    app.use("/api/products", router);
};
