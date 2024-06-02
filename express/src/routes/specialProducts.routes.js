module.exports = (express, app) => {
    const router = express.Router();
    const specialProductController = require("../controllers/specialProducts.controller.js");
    //getting special products
    router.get("/", specialProductController.all);
    

    app.use("/api/specialProducts", router);
};
