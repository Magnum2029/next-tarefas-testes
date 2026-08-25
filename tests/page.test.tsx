import { render, screen } from "@testing-library/react";
import Home from "../app/page";

// Mock da função que busca as tarefas
jest.mock("../data/tarefas", () => ({
  getTarefas: jest.fn().mockResolvedValue([
    { id: 1, titulo: "Estudar React" },
    { id: 2, titulo: "Aprender Next.js 15" },
    { id: 3, titulo: "Fazer testes com Jest" },
  ]),
}));

describe("Página inicial", () => {
  test("renderiza as tarefas carregadas pelo Server Component", async () => {
    const Page = await Home();

    render(Page);

    expect(screen.getByText("📋 Lista de Tarefas")).toBeInTheDocument();
    expect(screen.getByText("Estudar React")).toBeInTheDocument();
    expect(screen.getByText("Aprender Next.js 15")).toBeInTheDocument();
    expect(screen.getByText("Fazer testes com Jest")).toBeInTheDocument();
  });
});