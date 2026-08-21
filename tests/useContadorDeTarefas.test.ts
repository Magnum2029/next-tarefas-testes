import { renderHook } from "@testing-library/react";
import { useContadorDeTarefas } from "../hooks/useContadorDeTarefas";

describe("Hook useContadorDeTarefas", () => {
  test("retorna quantidade correta", () => {
    const tarefas = [
      { id: 1, titulo: "React" },
      { id: 2, titulo: "Next.js" },
      { id: 3, titulo: "Jest" },
    ];

    const { result } = renderHook(() =>
      useContadorDeTarefas(tarefas)
    );

    expect(result.current).toBe(3);
  });

  test("retorna zero quando não há tarefas", () => {
    const { result } = renderHook(() =>
      useContadorDeTarefas([])
    );

    expect(result.current).toBe(0);
  });
});