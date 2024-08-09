import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "..";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => ({
    addDoc: jest.fn(),
    onSnapshot: jest.fn(),
    deleteDoc: jest.fn(),
    updateDoc: jest.fn(),
  })),
}));
describe("Home Component", () => {
  test("renders and adds an item", async () => {
    render(<Home />);

    // Verifica se o input e o botão estão presentes
    expect(
      screen.getByPlaceholderText("Insira sua mensagem*")
    ).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();

    // Simula a digitação e o clique no botão de enviar
    fireEvent.change(screen.getByPlaceholderText("Insira sua mensagem*"), {
      target: { value: "New Item" },
    });
    fireEvent.click(screen.getByText("Enviar"));

    // Adicione expectativas para verificar o resultado
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  test("edits an item", async () => {
    render(<Home />);

    // Simula a edição do item
    fireEvent.click(screen.getByText("Editar"));

    const editInput = screen.getByPlaceholderText("Editando mensagem");
    fireEvent.change(editInput, { target: { value: "Edited Item" } });
    fireEvent.click(screen.getByText("Salvar"));

    // Adicione expectativas para verificar o resultado
    expect(screen.getByText("Edited Item")).toBeInTheDocument();
  });
});
