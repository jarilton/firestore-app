import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "..";

describe("Button Component", () => {
  test("renders the button with the correct label", () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick function when disabled", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} disabled />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("applies correct styles based on variant prop", () => {
    const { rerender } = render(
      <Button label="Primary" onClick={() => {}} variant="primary" />
    );
    expect(screen.getByText("Primary")).toHaveClass("primary"); // Ajuste a classe esperada se necessário

    rerender(
      <Button label="Secondary" onClick={() => {}} variant="secondary" />
    );
    expect(screen.getByText("Secondary")).toHaveClass("secondary"); // Ajuste a classe esperada se necessário

    rerender(<Button label="Danger" onClick={() => {}} variant="danger" />);
    expect(screen.getByText("Danger")).toHaveClass("danger"); // Ajuste a classe esperada se necessário
  });

  test("applies correct styles when disabled", () => {
    render(<Button label="Disabled" onClick={() => {}} disabled />);
    expect(screen.getByText("Disabled")).toHaveClass("disabled"); // Ajuste a classe esperada se necessário
  });
});
