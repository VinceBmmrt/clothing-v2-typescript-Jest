import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test-utils";
import Category from "../category.component";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    category: "mens",
  }),
}));

describe("Category component tests", () => {
  test("It should render a Spinner if isLoading", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("It should render Categories if is false", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              id: 1,
              title: "Hats",
              routeName: "hats",
              items: [],
            },
            {
              title: "mens",
              items: [
                {
                  id: 1,
                  name: "Mens Black Hat",
                },
                {
                  id: 2,
                  name: "Mens White Hat",
                },
              ],
            },
          ],
        },
      },
    });

    expect(screen.queryByTestId("spinner")).toBeNull();
    const product1Element = screen.getByText("Mens Black Hat");
    expect(product1Element).toBeInTheDocument();
  });
});
