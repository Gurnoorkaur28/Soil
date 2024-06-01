import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ReviewForm from '../components/ReviewForm';

// Mock functions
const mockOnReviewUpdated = jest.fn();
const mockUpdateReview = jest.fn();
const mockAddReview = jest.fn();
const mockOnReviewAdded = jest.fn();

test('allows comments with less than or equal to 100 words', async () => {
  await act(async () => {
    render(
      <ReviewForm
        productId={1}
        userId={1}
        onReviewUpdated={mockOnReviewUpdated}
        updateReview={mockUpdateReview}
        addReview={mockAddReview}
        onReviewAdded={mockOnReviewAdded}
      />
    );
  });

  const commentInput = screen.getByLabelText('Comment');
  const submitButton = screen.getByRole('button', { name: /submit review/i });

  // Create a comment with exactly 100 words
  const validComment = new Array(100).fill('word').join(' ');

  // Simulate user input
  await act(async () => {
    fireEvent.change(commentInput, { target: { value: validComment } });
  });

  // Submit the form
  await act(async () => {
    fireEvent.click(submitButton);
  });

  // Ensure no error message is displayed
  expect(screen.queryByText(/Comment should not exceed 100 words./)).toBeNull();
});

test('disallows comments with more than 100 words', async () => {
  await act(async () => {
    render(
      <ReviewForm
        productId={1}
        userId={1}
        onReviewUpdated={mockOnReviewUpdated}
        updateReview={mockUpdateReview}
        addReview={mockAddReview}
        onReviewAdded={mockOnReviewAdded}
      />
    );
  });

  const commentInput = screen.getByLabelText('Comment');
  const submitButton = screen.getByRole('button', { name: /submit review/i });

  // Create a comment with more than 100 words
  const invalidComment = new Array(101).fill('word').join(' ');

  // Simulate user input
  await act(async () => {
    fireEvent.change(commentInput, { target: { value: invalidComment } });
  });

  // Submit the form
  await act(async () => {
    fireEvent.click(submitButton);
  });

  // Ensure error message is displayed
  expect(screen.getByText(/Comment should not exceed 100 words./)).toBeInTheDocument();
});
