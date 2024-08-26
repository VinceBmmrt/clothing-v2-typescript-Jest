import { fireEvent, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import Navigation from "../../../routes/navigation/navigation.component";
import { signOutStart } from "../../../store/user/user.action";
import { renderWithProviders } from "../../../utils/test-utils";
import ProductCard from "../product-card.component";

describe("ProductCard test", () => {
  it("should have product item when product card is clicked", async () => {
    const mockProduct = {
      id: "4",
      name: "JCVD",
      price: "49",
      imageUrl: "http://localhost:3000/images/jcvd.jpg",
    };
    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      }
    );

    const addToCartButtonElement = screen.getByText(/Add to cart/i);
    await fireEvent.click(addToCartButtonElement);
    expect(store.getState().cart.cartItems.length).toBe(1);
  });

  it("should dispatch signOutStart when clicking on the signout link", async () => {
    // Create a mock function to spy on dispatch calls
    const mockDispatch = jest.fn();
    // Spy on the useDispatch hook from react-redux and return the mockDispatch function
    jest.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);
    // Render the Navigation component with a preloaded state using a custom render function
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });
    // Find the "SIGN OUT" link element in the rendered component
    const signOutLinkElement = screen.getByText(/SIGN OUT/i);
    // Assert that the "SIGN OUT" link is present in the document
    expect(signOutLinkElement).toBeInTheDocument();
    // Simulate a click event on the "SIGN OUT" link
    await fireEvent.click(signOutLinkElement);
    // Assert that the mockDispatch function was called
    expect(mockDispatch).toHaveBeenCalled();
    const signOutAction = signOutStart();
    // Assert that the mockDispatch function was called with the signOutStart action
    expect(mockDispatch).toHaveBeenCalledWith(signOutAction);
    // Clear the mockDispatch function
    mockDispatch.mockClear();
  });
});
