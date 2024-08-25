import { fireEvent, render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartDropdown from "../cart-dropdown.component";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CartDropdown", () => {
  beforeEach(() => {
    useSelector.mockReturnValue([]);
    useNavigate.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    useSelector.mockClear();
    useNavigate.mockClear();
  });

  test("renders empty cart message when cart is empty", () => {
    render(<CartDropdown />);
    const emptyMessage = screen.getByText("Your cart is empty");
    expect(emptyMessage).toBeInTheDocument();
  });

  test("renders cart items when cart is not empty", () => {
    useSelector.mockReturnValue([
      { id: 1, name: "Item 1", price: 10 },
      { id: 2, name: "Item 2", price: 20 },
    ]);

    render(<CartDropdown />);
    const cartItems = screen.getAllByTestId("cart-item");
    expect(cartItems.length).toBe(2);
  });

  test('calls navigate function when "GO TO CHECKOUT" button is clicked', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<CartDropdown />);
    const checkoutButton = screen.getByText("GO TO CHECKOUT");
    fireEvent.click(checkoutButton);

    expect(navigate).toHaveBeenCalledWith("/checkout");
  });
});
