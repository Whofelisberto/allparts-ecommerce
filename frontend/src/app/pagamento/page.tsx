"use client";

import { useState } from "react";

export default function PagamentoPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Pega o carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Envia endereço e carrinho para o backend
    const res = await fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endereco: form, cart }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full p-12 sm:p-8 rounded-lg shadow">
        <h2 className="font-bold text-xl text-center mb-4 uppercase">Pagamento</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="nome"
            type="text"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <input
            name="endereco"
            type="text"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <input
            name="cidade"
            type="text"
            placeholder="Cidade"
            value={form.cidade}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <input
            name="estado"
            type="text"
            placeholder="Estado"
            value={form.estado}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <input
            name="cep"
            type="text"
            placeholder="CEP"
            value={form.cep}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded px-4 py-2 font-semibold hover:bg-neutral-600 uppercase cursor-pointer"
          >
            {loading ? "Processando..." : "Pagar com Cartão"}
          </button>
        </form>
      </div>
    </div>
  );
}
