import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TarefasClient from "../app/tarefas-client";

describe("Fluxo completo de tarefas", () => {
  test("adiciona uma nova tarefa e atualiza a lista e o contador", async () => {
    const user = userEvent.setup();

    render(
      <TarefasClient
        tarefasIniciais={[
          { id: 1, titulo: "Estudar React" },
          { id: 2, titulo: "Aprender Next.js 15" },
        ]}
      />
    );

    // contador inicial
    expect(screen.getByText("Total de tarefas: 2")).toBeInTheDocument();

    // adiciona uma nova tarefa
    const input = screen.getByPlaceholderText(/nova tarefa/i);
    const botao = screen.getByRole("button", { name: /adicionar/i });

    await user.type(input, "Fazer testes com Jest");
    await user.click(botao);

    // nova tarefa aparece na lista
    expect(screen.getByText("Fazer testes com Jest")).toBeInTheDocument();

    // contador atualizado
    expect(screen.getByText("Total de tarefas: 3")).toBeInTheDocument();
  });
});