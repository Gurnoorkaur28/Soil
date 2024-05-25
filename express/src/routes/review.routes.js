module.exports = (express, app) => {
    const router = express.Router();
    const controller = require("../controllers/review.controller.js");

    
 router.get("/:productId",controller.getReviewsByProductId);
 router.post("/:user_id/:productId",controller.addReview);
  // Add routes to server.
  app.use("/api/review", router);
};