"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const product = {
      title,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      image_url: imageUrl,
    };
    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        alert("Produto cadastrado com sucesso!");
        setTitle("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategory("");
        setImageUrl("");
      } else {
        alert("Erro ao cadastrar produto");
      }
    } catch (err: unknown) {
      alert("Erro de conexão com a API");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Link href="/admin/">
        <button className="bg-black text-white px-5 py-2 rounded mb-3 font-semibold cursor-pointer uppercase">
          <ArrowLeft />
        </button>
      </Link>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl text-center font-bold mb-4 text-black uppercase">
          Cadastrar Produto
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Estoque"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="URL da Imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-black font-bold text-white px-4 py-2 rounded hover:bg-neutral-700 uppercase"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
