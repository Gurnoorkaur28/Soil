import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getReviewsByProductId, addReview, updateReview, deleteReview, getProductById } from "../data/productsData";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import useCart from "../hooks/useCart";

const ReviewsPage = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const { id } = useCart();

  useEffect(() => {
    const fetchReviewsAndProduct = async () => {
      try {
        const [reviews, product] = await Promise.all([
          getReviewsByProductId(productId),
          getProductById(productId)
        ]);
        setReviews(reviews);
        setProduct(product);
      } catch (error) {
        console.error("Failed to fetch reviews or product:", error);
      }
    };
    fetchReviewsAndProduct();
  }, [productId, reviewSubmitted]);

  const handleReviewAdded = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
    setReviewSubmitted(true);
  };

  const handleReviewUpdated = (updatedReview) => {
    setReviews(prevReviews => prevReviews.map(review => review.id === updatedReview.id ? updatedReview : review));
    setReviewSubmitted(true);
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
        <Col md={4}>
          {product && (
            <Card style={{ margin: "10px 0" }}>
              <Card.Img variant="top" src={`/images/${product.image}`} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {product.specialProducts && product.specialProducts.length > 0 ? (
                  <>
                    <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                    <Card.Text>
                      Special Price: ${product.specialProducts[0].discounted_price.toFixed(2)}
                    </Card.Text>
                  </>
                ) : (
                  <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={8}>
          <h2>Product Reviews</h2>
          {reviews.map(review => (
            <Card key={review.id} style={{ margin: "10px 0" }}>
              <Card.Body>
                <Card.Title>{review.rating} stars</Card.Title>
                <Card.Text>{review.comment} - {review.username}</Card.Text>
                {(id === review.user_id || reviewSubmitted) && (
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
