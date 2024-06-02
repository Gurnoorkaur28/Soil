import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import useCart from "../hooks/useCart";
import StarRating from "../utils/StarRating";
import useReviewHandlers from "../hooks/useReviewHandler";
import { addReview, updateReview } from "../data/productsData";
const ReviewsPage = () => {
  // Get the productId
  const { productId } = useParams();
  //Get user id from from use cart hook
  const { id } = useCart();
  //Get review handlers
  const {
    reviews,
    product,
    followStatus,
    error,
    handleReviewAdded,
    handleReviewUpdated,
    handleDeleteReview,
    handleFollow,
    handleUnfollow,
  } = useReviewHandlers(productId, id);

  return (
    <Container>
      <Row>
        <Col md={4}>
          {product && (
            <Card style={{ margin: "10px 0" }}>
              {/* Display the product image */}
              <Card.Img
                variant="top"
                src={`/images/${product.image}`}
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {/* Display the product price and special price (if any) */}
                {product.specialProducts &&
                product.specialProducts.length > 0 ? (
                  <>
                    <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                    <Card.Text>
                      Special Price: $
                      {product.specialProducts[0].discounted_price.toFixed(2)}
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
          {error && <p className="text-danger">{error}</p>}
          {reviews.map((review) => (
            <Card key={review.id} style={{ margin: "10px 0" }}>
              <Card.Body>
                {review.is_blocked ? (
                  // For blocked reviews
                  <>
                    <Card.Title>{review.username}</Card.Title>
                    <Card.Text>{review.comment}</Card.Text>
                    {id === review.user_id && (
                      <Button
                        className="checkout"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Delete Review
                      </Button>
                    )}
                  </>
                ) : (
                  // For normal reviews
                  <>
                    <Card.Title>{review.username}</Card.Title>
                    <Card.Title>
                      <StarRating rating={review.rating} />
                    </Card.Title>
                    <Card.Text>{review.comment}</Card.Text>
                    {id &&
                      id !== review.user_id &&
                      (followStatus[review.user_id] ? (
                        <Button onClick={() => handleUnfollow(review.user_id)}>
                          Unfollow
                        </Button>
                      ) : (
                        <Button onClick={() => handleFollow(review.user_id)}>
                          Follow
                        </Button>
                      ))}
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
                        <Button
                          className="checkout"
                          onClick={() => handleDeleteReview(review.id)}
                        >
                          Delete Review
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          ))}
          {id && !reviews.some((review) => review.user_id === id) && (
            <ReviewForm
              productId={productId}
              userId={id}
              onReviewAdded={handleReviewAdded}
              addReview={addReview}
              buttonClass="checkout"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ReviewsPage;
