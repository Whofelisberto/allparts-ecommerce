'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        alert("Cadastro realizado com sucesso! Faça login.");
        navigation.push("/login");
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão com a API.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-[550px] h-[500px] mx-auto bg-white p-12 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 uppercase text-center">Cadastrar-se</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-black text-white font-bold px-4 py-2 rounded hover:bg-neutral-800 uppercase"
        >
          Cadastrar
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
    </div>
  );
}
