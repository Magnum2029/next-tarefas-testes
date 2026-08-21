"use client";

import { useState } from "react";

interface Props {
  onAdicionar: (titulo: string) => void;
}

export default function NovaTarefa({ onAdicionar }: Props) {
  const [titulo, setTitulo] = useState("");

  function adicionar() {
    if (!titulo.trim()) return;

    onAdicionar(titulo);
    setTitulo("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <button onClick={adicionar}>
        Adicionar
      </button>
    </div>
  );
}