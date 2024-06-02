import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { deleteReview, fetchReviews } from "../data/repository";

import MessageContext from "../context/MessageContext";

// Subscriptions
import gql from "graphql-tag";
import client from "../apollo/client.js";

// https://www.npmjs.com/package/obscenity?activeTab=readme
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";

function Reviews() {
  // Context
  const { message, setMessage } = useContext(MessageContext);
  // Reviews
  const [reviews, setReviews] = useState(null);

  // Obscenity
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });

  // Subscription
  const REVIEW_ADDED = gql`
    subscription OnReviewAdded {
      review_added {
        id
        comment
        rating
        productId
        user_id
        is_blocked
      }
    }
  `;

  useEffect(() => {
    async function loadReviews() {
      const currentReviews = await fetchReviews();
      const checkedReviews = currentReviews.map((review) => ({
        ...review,
        isObscene: matcher.hasMatch(review.comment),
      }));
      setReviews(checkedReviews);
    }
    loadReviews();
  }, []);

  // useEffect for subscribing to new reviews
  useEffect(() => {
    const subscription = client.subscribe({ query: REVIEW_ADDED }).subscribe({
      next: ({ data: { review_added } }) => {
        setReviews((prevReviews) => {
          const isObscene = matcher.hasMatch(review_added.comment);
          const newReview = { ...review_added, isObscene };
          // Check if the new review already exists to prevent duplicates
          if (prevReviews.some((review) => review.id === newReview.id)) {
            return prevReviews;
          }
          // Append the new review to the current list
          return [...prevReviews, newReview];
        });
        // Set a message indicating a new review was added
        setMessage(`Review with ID ${review_added.id} created.`);
      },
      error: (err) => {
        console.error(`Subscription error: ${err}`);
        setMessage("Failed to receive new review updates.");
      },
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => subscription.unsubscribe();
  }, [setMessage, matcher]);

  const handleDelete = async (id) => {
    const deleted = await deleteReview(id);
    if (deleted) {
      setReviews(reviews.filter((review) => review.id !== id));
      setMessage(`Review ${id} has been successfully deleted.`);
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
