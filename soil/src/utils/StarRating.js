import React from 'react';
//star rating for reviews
//concept taken from https://youtu.be/9sSBMF8K7sY?si=3DKHbWVn34i6sg5K
const StarRating = ({ rating }) => {
  const fullStar = '★';
  const emptyStar = '☆';
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span key={index} style={{ color: index < rating ? 'gold' : 'gray' }}>
          {index < rating ? fullStar : emptyStar}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
