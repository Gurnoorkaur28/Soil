module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/review.controller.js");

  
router.get("/:productId",controller.getReviewsByProductId);
router.post("/:id/:productId",controller.addReview);
router.put("/:id/:productId/:reviewId", controller.updateReview);
router.delete("/:id/:productId/:reviewId", controller.deleteReview);
// Add routes to server.
app.use("/api/review", router);
};