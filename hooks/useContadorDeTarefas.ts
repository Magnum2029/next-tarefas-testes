"use client";

import { useMemo } from "react";

export function useContadorDeTarefas(
  tarefas: { id: number; titulo: string }[]
) {
  return useMemo(() => tarefas.length, [tarefas]);
}