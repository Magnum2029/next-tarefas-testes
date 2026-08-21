import { render, screen } from "@testing-library/react";

function ListaMock() {
  const tarefas = [
    { id: 1, titulo: "Estudar React" },
    { id: 2, titulo: "Aprender Next.js 15" },
    { id: 3, titulo: "Fazer testes com Jest" },
  ];

  return (
    <ul>
      {tarefas.map((tarefa) => (
        <li key={tarefa.id}>{tarefa.titulo}</li>
      ))}
    </ul>
  );
}

describe("Renderização da lista de tarefas", () => {
  test("renderiza todas as tarefas", () => {
    render(<ListaMock />);

    expect(screen.getByText("Estudar React")).toBeInTheDocument();
    expect(screen.getByText("Aprender Next.js 15")).toBeInTheDocument();
    expect(screen.getByText("Fazer testes com Jest")).toBeInTheDocument();
  });
});