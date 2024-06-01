import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteReview, fetchReviews } from "../data/repository";

import MessageContext from "../context/MessageContext";

// https://www.npmjs.com/package/obscenity?activeTab=readme
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

function Reviews() {
  // Navigate to pages
  const navigate = useNavigate();

  // Context
  const { message, setMessage } = useContext(MessageContext);
  // Reviews
  const [reviews, setReviews] = useState(null);

  // Obscenity
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  // Fetch reviews the check and sets them in state
  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const reviews = await fetchReviews();

    // Check for profanity in comments
    const checkReviews = reviews.map((review) => {
      const isObscene = matcher.hasMatch(review.comment);
      return { ...review, isObscene };
    });

    setReviews(checkReviews);
  };

  // Deletes review
  const handleDelete = async (id) => {
    const deleted = await deleteReview(id);
    // Referesh page and set msg after delete
    if (deleted) {
      await getReviews();
      setMessage(
        <>
          Review <strong>{id}</strong> has been successfully deleted.
        </>
      );
    }
  };

  if (reviews == null) return null;
  return (
    <div>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <h1 className="text-start display-4">Reviews</h1>
      <table className="table table-hover">
        {/* Head */}
        <thead>
          <tr className="table-primary">
            <th>ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Product Id</th>
            <th>User Id</th>
            <th></th>
          </tr>
        </thead>
        {/* Body */}
        <tbody>
          {/* Map Users */}
          {reviews.map(
            (review) =>
              !review.is_blocked && (
                // Change comments with profanity to red
                <tr
                  key={review.id}
                  className={review.isObscene ? "table-danger" : ""}
                >
                  <td>{review.id}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                  <td>{review.productId}</td>
                  <td>{review.user_id}</td>
                  <td>
                    {" "}
                    <Button
                      variant="outline-danger w-50"
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reviews;
