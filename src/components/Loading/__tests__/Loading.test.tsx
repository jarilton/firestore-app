import { render, screen } from "@testing-library/react";
import { Loading } from "..";

describe("Loading Component", () => {
  test("renders without crashing", () => {
    render(<Loading />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  test("renders custom message when provided", () => {
    const customMessage = "Please wait...";
    render(<Loading message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
