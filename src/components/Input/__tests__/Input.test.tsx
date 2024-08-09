import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "..";

describe("Input Component", () => {
  test("renders the input with the correct label", () => {
    render(<Input label="Username" value="" onChange={() => {}} />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  test("renders the input with the correct placeholder", () => {
    render(
      <Input
        label="Username"
        value=""
        onChange={() => {}}
        placeholder="Enter username"
      />
    );
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  test("renders the input with the correct value", () => {
    render(
      <Input label="Username" value="current value" onChange={() => {}} />
    );
    expect(screen.getByDisplayValue("current value")).toBeInTheDocument();
  });
});
