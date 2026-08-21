import { getTarefas } from "../data/tarefas";
import TarefasClient from "./tarefas-client";

export default async function Home() {
  const tarefas = await getTarefas();

  return (
    <main className="container">
      <h1>📋 Lista de Tarefas</h1>

      <p>Projeto de testes unitários em Next.js 15.</p>

      <TarefasClient tarefasIniciais={tarefas} />
    </main>
  );
}