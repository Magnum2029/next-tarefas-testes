"use client";

import { useEffect, useState } from "react";
import NovaTarefa from "../components/NovaTarefa";
import { useContadorDeTarefas } from "../hooks/useContadorDeTarefas";

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

type Filtro = "todas" | "pendentes" | "concluidas";

const STORAGE_KEY = "lista-tarefas";

export default function TarefasClient({
  tarefasIniciais,
}: {
  tarefasIniciais: Omit<Tarefa, "concluida">[];
}) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem(STORAGE_KEY);

    if (tarefasSalvas) {
      try {
        setTarefas(JSON.parse(tarefasSalvas));
      } catch {
        setTarefas(
          tarefasIniciais.map((tarefa) => ({
            ...tarefa,
            concluida: false,
          }))
        );
      }
    } else {
      setTarefas(
        tarefasIniciais.map((tarefa) => ({
          ...tarefa,
          concluida: false,
        }))
      );
    }

    setCarregado(true);
  }, [tarefasIniciais]);

  useEffect(() => {
    if (!carregado) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  }, [tarefas, carregado]);

  const contador = useContadorDeTarefas(tarefas);

  const totalPendentes = tarefas.filter(
    (tarefa) => !tarefa.concluida
  ).length;

  const totalConcluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  function adicionarTarefa(titulo: string) {
    setTarefas((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo,
        concluida: false,
      },
    ]);
  }

  function alternarConclusao(id: number) {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function excluirTarefa(id: number) {
    setTarefas((prev) =>
      prev.filter((tarefa) => tarefa.id !== id)
    );
  }

  return (
    <>
      <NovaTarefa onAdicionar={adicionarTarefa} />

      <div className="resumo-tarefas">
        <div className="resumo-card">
          <span>Total</span>
          <strong>{contador}</strong>
        </div>

        <div className="resumo-card">
          <span>Pendentes</span>
          <strong>{totalPendentes}</strong>
        </div>

        <div className="resumo-card">
          <span>Concluídas</span>
          <strong>{totalConcluidas}</strong>
        </div>
      </div>

      <div className="filtros">
        <button
          className={filtro === "todas" ? "filtro-ativo" : ""}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>

        <button
          className={filtro === "pendentes" ? "filtro-ativo" : ""}
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>

        <button
          className={filtro === "concluidas" ? "filtro-ativo" : ""}
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </div>

      <ul>
        {tarefasFiltradas.map((tarefa) => (
          <li key={tarefa.id} className="tarefa-item">
            <div className="tarefa-conteudo">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarConclusao(tarefa.id)}
                aria-label={`Concluir ${tarefa.titulo}`}
              />

              <span
                className={
                  tarefa.concluida ? "tarefa-concluida" : ""
                }
              >
                {tarefa.titulo}
              </span>
            </div>

            <button
              className="botao-excluir"
              onClick={() => excluirTarefa(tarefa.id)}
              aria-label={`Excluir ${tarefa.titulo}`}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {tarefasFiltradas.length === 0 && (
        <p className="lista-vazia">
          Nenhuma tarefa encontrada.
        </p>
      )}
    </>
  );
}