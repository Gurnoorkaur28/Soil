import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import StarRating from "../utils/StarRating"; // Import the StarRating component

const ReviewForm = ({
  // The ID of the product being reviewed
  productId,
  // The ID of the user submitting the review
  userId,
  // The existing review data (if any) for updating
  review,
  // Callback function to handle review update
  onReviewUpdated,
  // Function to update the review
  updateReview,
  // Function to add a new review
  addReview,
   // Callback function to handle new review 
  onReviewAdded,
}) => {
   // State to manage the rating and comment input fields
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [comment, setComment] = useState(review ? review.comment : "");
  const [error, setError] = useState("");
  // Handle star rating click
  const handleStarClick = (newRating) => {
    setRating(newRating);
  };
   // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
   // Validate comment word count
   const wordCount = comment.trim().split(/\s+/).length;
   if (wordCount > 100) {
   setError("Comment should not exceed 100 words.");
     return;
    }
    // Validate rating
    if (rating === 0) {
      setError("Rating is required.");
      return;
    }
    try {
      if (review) {
        // Update existing review
        const updatedReview = await updateReview(userId, productId, review.id, { rating, comment });
        onReviewUpdated(updatedReview);
      } else {
        // Add new review
        const newReview = await addReview(userId, productId, { rating, comment });
        onReviewAdded(newReview);
      }
      // Reset form fields
      setRating(0);
      setComment("");
      setError("");
    } catch (error) {
      console.error("Failed to update/add review", error);
      setError("Failed to update/add review");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="rating">
        <Form.Label>Rating</Form.Label>
        {/* Display the star rating component */}
        <StarRating rating={rating} />
        <div>
         {/* Render clickable stars for rating input */}   
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
      </Form.Group>
      {/* Text area for comment input */}
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
       {/* Button changes based on whether it's an update or a new review */}
      <Button variant="primary" type="submit" className="checkout">
        {review ? "Update Review" : "Submit Review"}
      </Button>
    </Form>
  );
};

export default ReviewForm;
