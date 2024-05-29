import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ReviewForm = ({
  productId,
  userId,
  review,
  onReviewUpdated,
  updateReview,
  addReview,
  onReviewAdded,
}) => {
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [comment, setComment] = useState(review ? review.comment : "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate comment word count
    const wordCount = comment.trim().split(/\s+/).length;
    if (wordCount > 100) {
      setError("Comment should not exceed 100 words.");
      return;
    }

    try {
      if (review) {
        // Update review
        const updatedReview = await updateReview(userId, productId, review.id, { rating, comment });
        onReviewUpdated(updatedReview);
      } else {
        // Add new review
        const newReview = await addReview(userId, productId, { rating, comment });
        onReviewAdded(newReview);
      }
      setRating(0);
      setComment("");
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Failed to update/add review", error);
      setError("Failed to update/add review");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
      </Form.Group>
      <Button variant="primary" type="submit" className="checkout">
    {review ? "Update Review" : "Submit Review"}
    </Button>
    </Form>
  );
};

export default ReviewForm;
