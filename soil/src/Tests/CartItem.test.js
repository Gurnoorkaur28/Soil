/**this test checks if products are correctly added to cart 
 * and uses test component which integerates the behaviour of
 *  use cart hook,for testing 
 **/
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TestCartComponent from '../utils/TestCartComponent'; 
import { addItemToCart, getUserCart } from '../data/productsData'; 
import { getUserId } from '../data/repository'; 
import { act } from 'react-dom/test-utils'; 

// Mock the external dependencies
jest.mock('../data/productsData');
jest.mock('../data/repository');

describe('Cart - Adding Items', () => {
  // Clear all mocks before each test to ensure clean test state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case to check if items are added to the cart correctly
  test('adds item to the cart', async () => {
    // Mock the getUserId function to return a user ID
    getUserId.mockResolvedValue(1);

    // Mock the initial state of the cart to be empty
    getUserCart.mockResolvedValueOnce({ cartItems: [] });

    // Mock the addItemToCart function to simulate adding an item
    addItemToCart.mockResolvedValueOnce();

    // Mock the state of the cart after adding an item
    getUserCart.mockResolvedValueOnce({
      cartItems: [
        { id: 1, product: { name: 'Product 1', price: 10 }, quantity: 2 },
      ],
    });

    // Render the TestCartComponent
    const { getByTestId } = render(<TestCartComponent />);

    // Use act to wrap state updates and DOM updates
    await act(async () => {
      // Simulate a click on the add item button
      fireEvent.click(getByTestId('addItem'));
    });

    //  update and check if the item is added to the cart
    //(Product 1 - 2 x 10') represents productId,quantity,price respectively
    await waitFor(() => {
      expect(screen.getByText('Product 1 - 2 x 10')).toBeInTheDocument();
    });
  });
});
