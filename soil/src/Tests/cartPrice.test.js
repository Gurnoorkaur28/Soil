//Test for checking if proces are calculaated correctly in use cart 
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TestCartComponent from '../utils/TestCartComponent'; // Import the test component that uses the useCart hook
import { getUserCart } from '../data/productsData'; // Import data functions
import { getUserId } from '../data/repository'; // Import repository functions

// Mock the external dependencies so actual API calls are not made
jest.mock('../data/productsData');
jest.mock('../data/repository');

// Define a test suite for the useCart hook
describe('useCart hook', () => {
  // Clear all mocks before each test to ensure tests are isolated
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Check if the total price is calculated correctly for regular priced items
  test('calculates total price correctly with regular priced items', async () => {
    // Mock the getUserId function to return a user ID
    getUserId.mockResolvedValue(1);

    // Mock the getUserCart function to return a cart with regular priced items
    getUserCart.mockResolvedValue({
      cartItems: [
        { id: 1, product: { price: 10, specialProducts: [], name: 'Product 1' }, quantity: 2 },
        { id: 2, product: { price: 20, specialProducts: [], name: 'Product 2' }, quantity: 1 },
      ],
    });

    // Render the TestCartComponent
    render(<TestCartComponent />);

    // Wait for the component to update and then check if the total price is correct
    await waitFor(() => {
      expect(screen.getByTestId('totalPrice').textContent).toBe('40');
    });
  });

  // Test case: Check if the total price is calculated correctly for discounted items
  test('calculates total price correctly with discounted items', async () => {
    // Mock the getUserId function to return a user ID
    getUserId.mockResolvedValue(1);

    // Mock the getUserCart function to return a cart with discounted items
    getUserCart.mockResolvedValue({
      cartItems: [
        {
          id: 1,
          product: { price: 10, specialProducts: [{ discounted_price: 8 }], name: 'Product 1' },
          quantity: 2,
        },
        {
          id: 2,
          product: { price: 20, specialProducts: [{ discounted_price: 15 }], name: 'Product 2' },
          quantity: 1,
        },
      ],
    });

    // Render the TestCartComponent
    render(<TestCartComponent />);

    // Wait for the component to update and then check if the total price is correct
    await waitFor(() => {
      expect(screen.getByTestId('totalPrice').textContent).toBe('31');
    });
  });

  // Test case: Check if the total price is calculated correctly for mixed items (regular and discounted)
  test('calculates total price correctly with mixed items', async () => {
    // Mock the getUserId function to return a user ID
    getUserId.mockResolvedValue(1);

    // Mock the getUserCart function to return a cart with mixed items
    getUserCart.mockResolvedValue({
      cartItems: [
        {
          id: 1,
          product: { price: 10, specialProducts: [{ discounted_price: 8 }], name: 'Product 1' },
          quantity: 2,
        },
        { id: 2, product: { price: 20, specialProducts: [], name: 'Product 2' }, quantity: 1 },
      ],
    });

    // Render the TestCartComponent
    render(<TestCartComponent />);

    // Wait for the component to update and then check if the total price is correct
    await waitFor(() => {
      expect(screen.getByTestId('totalPrice').textContent).toBe('36');
    });
  });

  // Test case: Check if the total price is calculated correctly for multiple quantities of items
  test('calculates total price correctly with multiple quantities', async () => {
    // Mock the getUserId function to return a user ID
    getUserId.mockResolvedValue(1);

    // Mock the getUserCart function to return a cart with multiple quantities of items
    getUserCart.mockResolvedValue({
      cartItems: [
        { id: 1, product: { price: 10, specialProducts: [], name: 'Product 1' }, quantity: 3 },
        {
          id: 2,
          product: { price: 20, specialProducts: [{ discounted_price: 15 }], name: 'Product 2' },
          quantity: 2,
        },
      ],
    });

    // Render the TestCartComponent
    render(<TestCartComponent />);

    // Wait for the component to update and then check if the total price is correct
    await waitFor(() => {
      expect(screen.getByTestId('totalPrice').textContent).toBe('60');
    });
  });
});
