import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../../store/cart/cart.actions"; // Ensure this import path is correct
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../../store/cart/cart.selector";
import CartIcon from "../cart-icon.component";

// Mock react-redux hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("CartIcon", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    // Reset mock implementations before each test
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectCartCount:
          return 5; // Example cart count
        case selectIsCartOpen:
          return false; // Example initial state
        default:
          return undefined;
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders cart icon with item count", () => {
    render(<CartIcon />);

    const itemCount = screen.getByText("5"); // Ensure '5' is the correct item count
    expect(itemCount).toBeInTheDocument();
  });

  test("dispatches setIsCartOpen action on click", () => {
    render(<CartIcon />);

    const cartIconContainer = screen.getByRole("button"); // Ensure CartIconContainer is rendered as a button
    fireEvent.click(cartIconContainer);

    expect(dispatch).toHaveBeenCalledWith(setIsCartOpen(true)); // Expectation based on initial state
  });

  test("toggles cart open state when clicked", () => {
    // Mock implementation for this specific test
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectCartCount:
          return 5; // Example cart count
        case selectIsCartOpen:
          return true; // Change initial state to true for this test
        default:
          return undefined;
      }
    });

    render(<CartIcon />);

    const cartIconContainer = screen.getByRole("button"); // Ensure CartIconContainer is rendered as a button
    fireEvent.click(cartIconContainer);

    expect(dispatch).toHaveBeenCalledWith(setIsCartOpen(false)); // Expectation based on updated state
  });
});
