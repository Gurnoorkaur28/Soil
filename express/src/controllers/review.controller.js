const db = require("../database");


exports.getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await db.review.findAll({
      where: {
        productId: productId,
      },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
exports.addReview = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const productId = req.params.productId;
      const review = await db.review.create({
        rating: parseInt(req.query.rating), // Parse the rating as an integer
        comment: req.query.comment,
        userId,
        productId,
      });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to add review" });
    }
  };