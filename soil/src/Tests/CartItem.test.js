import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TestCartComponent from '../utils/TestCartComponent';
import { addItemToCart, getUserCart } from '../data/productsData';
import { getUserId } from '../data/repository';
import { act } from 'react-dom/test-utils';

jest.mock('../data/productsData');
jest.mock('../data/repository');

describe('Cart - Adding Items', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('adds item to the cart', async () => {
    getUserId.mockResolvedValue(1);

    getUserCart.mockResolvedValueOnce({ cartItems: [] }); // Initial empty cart

    addItemToCart.mockResolvedValueOnce();

    getUserCart.mockResolvedValueOnce({
      cartItems: [
        { id: 1, product: { name: 'Product 1', price: 10 }, quantity: 2 },
      ],
    });

    const { getByTestId } = render(<TestCartComponent />);

    await act(async () => {
      fireEvent.click(getByTestId('addItem'));
    });

    await waitFor(() => {
      expect(screen.getByText('Product 1 - 2 x 10')).toBeInTheDocument();
    });
  });
});
