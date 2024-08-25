import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { rootReducer } from "../store/root-reducer"; // Ensure this path is correct

// Function to render a component with Redux and Router providers
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = createStore(rootReducer, preloadedState), // Ensure store is correctly created
    ...renderOptions
  } = {}
) {
  // Wrapper component to provide Redux store and Router context
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  // Render the UI with the Wrapper and return the store and query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
