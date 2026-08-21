"use client";

import { useState } from "react";
import NovaTarefa from "../components/NovaTarefa";
import { useContadorDeTarefas } from "../hooks/useContadorDeTarefas";

interface Tarefa {
  id: number;
  titulo: string;
}

export default function TarefasClient({
  tarefasIniciais,
}: {
  tarefasIniciais: Tarefa[];
}) {
  const [tarefas, setTarefas] = useState(tarefasIniciais);

  const contador = useContadorDeTarefas(tarefas);

  function adicionarTarefa(titulo: string) {
    setTarefas((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo,
      },
    ]);
  }

  return (
    <>
      <NovaTarefa onAdicionar={adicionarTarefa} />

      <h3>Total de tarefas: {contador}</h3>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.titulo}</li>
        ))}
      </ul>
    </>
  );
}