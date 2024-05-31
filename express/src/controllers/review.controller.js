const db = require("../database");

// Get all reviews by productId
exports.getReviewsByProductId = async (req, res) => {
    try {
      const productId = req.params.productId;
      const reviews = await db.review.findAll({
        where: { productId },
        include: [{
          model: db.user,
          attributes: ['full_name'],
        }],
      });
  
      // Format the response to include the username
      const formattedReviews = reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        productId: review.productId,
        user_id: review.user_id,
        username: review.user.full_name,
      }));
  
      res.json(formattedReviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  };
//add reviews in specific user id
exports.addReview = async (req, res) => {
    try {
        const user_id = req.params.id;
      const productId = req.params.productId;
      const review = await db.review.create({
        
        rating: req.body.rating, // Parse the rating as an integer
        comment: req.body.comment,
        user_id,
        productId,
      });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to add review" });
    }
  };
  //update reviews 
  exports.updateReview = async (req, res) => {
    try {
      const userId = req.params.id;
      const productId = req.params.productId;
      const reviewId = req.params.reviewId;
  
      const review = await db.review.findOne({
        where: {
          id: reviewId,
          user_id: userId,
          productId: productId,
        },
      });
  
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
  
      //if (review.userId !== userId) {
        //return res.status(403).json({ error: "You are not authorized to update this review" });
     // }
  
      const { rating, comment } = req.body;
  
      if (!rating || !comment) {
        return res.status(400).json({ error: "Rating and comment are required" });
      }
  
     // if (isNaN(parseInt(rating))) {
      //  return res.status(400).json({ error: "Rating must be a number" });
     // }
  
      await review.update({
        rating: parseInt(rating),
        comment,
      });
  
      res.json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update review" });
    }
  };
  //delete reviews
  exports.deleteReview = async (req, res) => {
    try {
        
      const userId = req.params.id;
      const productId = req.params.productId;
      const reviewId = req.params.reviewId;
  
      const review = await db.review.findOne({
        where: {
          id: reviewId,
          user_id: userId,
          productId: productId,
        },
      });
  
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
  
      // Check if the user is authorized to delete the review
      //if (review.user_id !== userId) {
       // return res.status(403).json({ error: "You are not authorized to delete this review" });
  //    }
  
      await review.destroy();
  
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete review" });
    }
  };