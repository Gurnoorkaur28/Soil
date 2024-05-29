import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getReviewsByProductId, addReview, updateReview, deleteReview } from "../data/productsData";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import useCart from "../hooks/useCart";


const ReviewsPage = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const { id } = useCart();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReviewsByProductId(productId);
        setReviews(reviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleReviewAdded = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  const handleReviewUpdated = (updatedReview) => {
    setReviews(prevReviews => prevReviews.map(review => review.id === updatedReview.id ? updatedReview : review));
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(id, productId, reviewId);
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Product Reviews</h2>
          {reviews.map(review => (
            <Card key={review.id} style={{ margin: "10px 0" }}>
              <Card.Body>
                <Card.Title>{review.rating} stars</Card.Title>
                <Card.Text>{review.comment} - {review.username}</Card.Text>
                {id === review.user_id && (
                  <>
                    <ReviewForm
                      productId={productId}
                      userId={id}
                      review={review}
                      onReviewUpdated={handleReviewUpdated}
                      updateReview={updateReview}
                      addReview={addReview}
                      onReviewAdded={handleReviewAdded}
                      
                    />
                    <Button className="checkout" onClick={() => handleDeleteReview(review.id)}>Delete Review</Button>
                    
                  </>
                )}
              </Card.Body>
            </Card>
          ))}
          {id && !reviews.some(review => review.user_id === id) && (
            <ReviewForm productId={productId} userId={id} onReviewAdded={handleReviewAdded} addReview={addReview} buttonClass="checkout" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewsPage;
