import { render, screen, fireEvent } from "@testing-library/react";
import NovaTarefa from "../components/NovaTarefa";

describe("Componente NovaTarefa", () => {
  test("renderiza input e botão", () => {
    render(<NovaTarefa onAdicionar={jest.fn()} />);

    expect(screen.getByPlaceholderText("Nova tarefa")).toBeInTheDocument();
    expect(screen.getByText("Adicionar")).toBeInTheDocument();
  });

  test("adiciona uma nova tarefa", () => {
    const adicionar = jest.fn();

    render(<NovaTarefa onAdicionar={adicionar} />);

    fireEvent.change(screen.getByPlaceholderText("Nova tarefa"), {
      target: { value: "Estudar Jest" },
    });

    fireEvent.click(screen.getByText("Adicionar"));

    expect(adicionar).toHaveBeenCalledWith("Estudar Jest");
  });

  test("não envia tarefa vazia", () => {
    const adicionar = jest.fn();

    render(<NovaTarefa onAdicionar={adicionar} />);

    fireEvent.click(screen.getByText("Adicionar"));

    expect(adicionar).not.toHaveBeenCalled();
  });
});