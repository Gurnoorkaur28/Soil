/**this test checks if the quantity handler function
 * used in cart increase and decrease and takes correct input 
 * for quantity
 * */ 
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import QuantityHandler from '../components/QuantityHandler';

describe('QuantityHandler Component', () => {
  let item;
  let onQuantityChange;
 // This function runs before each test, initializing item and the onQuantityChange mock function.
  beforeEach(() => {
    item = { productId: 1, quantity: 1 };
    onQuantityChange = jest.fn();
  });
  // Test to check the initial render of the component.
  test('initial render', () => {
    // Render the QuantityHandler component.
    const { getByDisplayValue } = render(
      <QuantityHandler item={item} onQuantityChange={onQuantityChange} />
    );
    // Check if the input field displays the initial quantity.
    expect(getByDisplayValue('1')).toBeInTheDocument();
  });
  // Test to check if the quantity increments correctly.
  test('increments the quantity', () => {
    // Render the QuantityHandler component.
    const { getByText, getByDisplayValue } = render(
      <QuantityHandler item={item} onQuantityChange={onQuantityChange} />
    );
    // Simulate a click on the increment button.
    const incrementButton = getByText('+');
    fireEvent.click(incrementButton);
    // Check if the input field displays the incremented quantity.
    expect(getByDisplayValue('2')).toBeInTheDocument();
    // Check if the onQuantityChange function was called with the correct arguments.
    expect(onQuantityChange).toHaveBeenCalledWith(1, 2);
  });
  // Test to check if the quantity decrements correctly.
  test('decrements the quantity', () => {
    item.quantity = 2; // Set initial quantity to 2
    // Render the QuantityHandler component.
    const { getByText, getByDisplayValue } = render(
      <QuantityHandler item={item} onQuantityChange={onQuantityChange} />
    );
    // Simulate a click on the decrement button.
    const decrementButton = getByText('-');
    fireEvent.click(decrementButton);
    // Check if the input field displays the decremented quantity.
    expect(getByDisplayValue('1')).toBeInTheDocument();
    // Check if the onQuantityChange function was called with the correct arguments.
    expect(onQuantityChange).toHaveBeenCalledWith(1, 1);
  });
    // Test to check if the quantity does not go below 1.
    test('does not decrement quantity below 1', () => {
    // Render the QuantityHandler component.
    const { getByText, getByDisplayValue } = render(
      <QuantityHandler item={item} onQuantityChange={onQuantityChange} />
    );
    // Simulate a click on the decrement button.
    const decrementButton = getByText('-');
    fireEvent.click(decrementButton);
    // Check if the input field still displays the quantity 1
    expect(getByDisplayValue('1')).toBeInTheDocument();
     // Check if the onQuantityChange function was not called
    expect(onQuantityChange).not.toHaveBeenCalled();
  });
  // Test to check if the quantity changes correctly via input field.
  test('changes quantity via input field', () => {
    const { getByDisplayValue } = render(
      <QuantityHandler item={item} onQuantityChange={onQuantityChange} />
    );
     // Simulate a change in the input field value.
    const input = getByDisplayValue('1');
    fireEvent.change(input, { target: { value: '3' } });
   // Check if the input field displays the new quantity.
    expect(getByDisplayValue('3')).toBeInTheDocument();
    expect(onQuantityChange).toHaveBeenCalledWith(1, 3);
  });
  // Simulate a change in the input field value to a non-numeric string.
  test('prevents setting non-numeric or invalid quantities', () => {
    const { getByDisplayValue } = render(
      <QuantityHandler item={item} onQuantityChange={onQuantityChange} />
    );
    // Simulate a change in the input field value to a non-numeric string.
    const input = getByDisplayValue('1');
    fireEvent.change(input, { target: { value: 'abc' } });
    // Check if the input field still displays the initial quantity.
    expect(getByDisplayValue('1')).toBeInTheDocument();
    // Check if the onQuantityChange function was not called.
    expect(onQuantityChange).not.toHaveBeenCalled();
  });
});
