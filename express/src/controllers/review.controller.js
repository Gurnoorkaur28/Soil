const { request, gql } = require("graphql-request");

const db = require("../database");

// Subscription
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// Get all reviews by productId
exports.getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await db.review.findAll({
      where: { productId },
      include: [
        {
          model: db.user,
          attributes: ["full_name"],
        },
      ],
    });

    // Format the response to include the username
    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      productId: review.productId,
      user_id: review.user_id,
      username: review.user.full_name,
      is_blocked: review.is_blocked,
    }));

    res.json(formattedReviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
//add reviews in specific user id
exports.addReview = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const productId = parseInt(req.params.productId);
    const { rating, comment } = req.body;

    const query = gql`
      mutation (
        $rating: Int!
        $comment: String!
        $productId: Int!
        $user_id: Int!
      ) {
        create_review(
          input: {
            rating: $rating
            comment: $comment
            productId: $productId
            user_id: $user_id
          }
        ) {
          id
          rating
          comment
          productId
          user_id
          is_blocked
        }
      }
    `;
    const variables = {
      rating,
      comment,
      productId,
      user_id,
    };
    const data = await request(GRAPH_QL_URL, query, variables);

    res.json(data.create_review);
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

    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: "Rating and comment are required" });
    }

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

    await review.destroy();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
