import { useEffect, useState } from "react";
import { getReviewsByProductId,
  deleteReview,
  getProductById,
  followUser,
  unfollowUser,
  getFollowingStatus } from "../data/productsData";
// Custom hook to handle reviews and related functionality
const useReviewHandlers = (productId, userId) => {
  //state to store reviews
  const [reviews, setReviews] = useState([]);
  // State to store product details,
  const [product, setProduct] = useState(null);
  //state for follow status
  const [followStatus, setFollowStatus] = useState({});
  const [error, setError] = useState(null);
  //state for submission of review
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
// Fetch reviews, product details, and follow status when productId, userId, or reviewSubmitted changes
  useEffect(() => {
    const fetchReviewsAndProduct = async () => {
      try {
       // Promise.allwaits for all the promises to either resolve or any one of them to reject.
        const [reviews, product, followStatus] = await Promise.all([
          //Once all promises have resolved, the results are assigned to the variables reviews, product, and followStatus
          getReviewsByProductId(productId),
          getProductById(productId),
          getFollowingStatus(userId),
        ]);
        setReviews(reviews);
        setProduct(product);
        // Initialize follow status
        const initialFollowStatus = {};
        followStatus.followingIds.forEach((followingId) => {
          initialFollowStatus[followingId] = true;
        });
        setFollowStatus(initialFollowStatus);
      } catch (err) {
        setError("Failed to fetch reviews, product or follow status");
        console.error(err);
      }
    };

    fetchReviewsAndProduct();
  }, [productId, userId, reviewSubmitted]);
  // Handler for adding a new review
  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setReviewSubmitted(true);
  };
  // Handler for updating an existing review
  const handleReviewUpdated = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => (review.id === updatedReview.id ? updatedReview : review))
    );
    setReviewSubmitted(true);
  };
  // Handler for deleting a review
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(userId, productId, reviewId);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };
  // Handler for following user
  const handleFollow = async (followingId) => {
    try {
      await followUser(userId, followingId);
      setFollowStatus((prevStatus) => ({ ...prevStatus, [followingId]: true }));
    } catch (error) {
      console.error("Failed to follow user", error);
    }
  };
// Handler for unfollowing user
  const handleUnfollow = async (followingId) => {
    try {
      await unfollowUser(userId, followingId);
      setFollowStatus((prevStatus) => ({ ...prevStatus, [followingId]: false }));
    } catch (error) {
      console.error("Failed to unfollow user", error);
    }
  };

  return {
    reviews,
    product,
    followStatus,
    setReviews,
    setFollowStatus,
    error,
    handleReviewAdded,
    handleReviewUpdated,
    handleDeleteReview,
    handleFollow,
    handleUnfollow,
  };
};

export default useReviewHandlers;
