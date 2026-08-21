export const tarefas = [
  { id: 1, titulo: "Estudar React" },
  { id: 2, titulo: "Aprender Next.js 15" },
  { id: 3, titulo: "Fazer testes com Jest" },
];

export async function getTarefas() {
  return Promise.resolve(tarefas);
}