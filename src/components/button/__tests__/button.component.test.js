import { fireEvent, render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component"; // Adjusted import path

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Hello</Button>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders base button by default", () => {
    render(<Button data-testid="base-button" />);
    const button = screen.getByTestId("base-button");
    expect(button).toHaveStyle("background-color: white"); // Adjusted expected style
    expect(button).toHaveStyle("color: black"); // Adjusted expected style
  });

  it("renders different button types correctly", () => {
    render(
      <Button
        buttonType={BUTTON_TYPE_CLASSES.google}
        data-testid="google-button"
      />
    );
    let button = screen.getByTestId("google-button");
    expect(button).toHaveStyle("background-color: rgb(53, 122, 232)");
    expect(button).toHaveStyle("color: white");

    render(
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        data-testid="inverted-button"
      />
    );
    button = screen.getByTestId("inverted-button");
    expect(button).toHaveStyle("background-color: black");
    expect(button).toHaveStyle("color: white");
  });

  it("calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when isLoading is true", () => {
    render(<Button isLoading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
