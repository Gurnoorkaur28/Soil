module.exports = (express, app) => {
  const router = express.Router();
  const controller = require("../controllers/review.controller.js");
//get reviews for productId
router.get("/:productId",controller.getReviewsByProductId);
//posting reviews by user for a productID 
router.post("/:id/:productId",controller.addReview);
//update review by user for a productID
router.put("/:id/:productId/:reviewId", controller.updateReview);
//delete review by user for a productID
router.delete("/:id/:productId/:reviewId", controller.deleteReview);
// Add routes to server.
app.use("/api/review", router);
};