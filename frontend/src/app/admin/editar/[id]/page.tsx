"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
};

export default function EditProductPage() {
  const navigation = useRouter();
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    const { name, value } = e.target;
    // Se for o campo price, converte para número
    if (name === "price") {
      setProduct({ ...product, price: Number(value) });
    } else if (name === "stock") {
      setProduct({ ...product, stock: Number(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleUpdate = async () => {
    if (!product) return;
    const token = localStorage.getItem("token");
    // Garante que price e stock são números
    const payload = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
    };
    const res = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Produto atualizado com sucesso!");
      navigation.push("/admin/editaroudeletar");
    } else {
      alert("Erro ao atualizar produto");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Link href="/admin/editaroudeletar">
        <button className="bg-black text-white px-5 py-2 rounded mb-3 font-semibold cursor-pointer uppercase">
          <ArrowLeft />
        </button>
      </Link>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 uppercase">Editar Produto</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded"
            placeholder="Título"
          />
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded"
            placeholder="Descrição"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded"
            placeholder="Preço"
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded"
            placeholder="Estoque"
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded"
            placeholder="Categoria"
          />
          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleEditChange}
            className="border px-2 py-1 rounded"
            placeholder="URL da Imagem"
          />
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </main>
  );
}
