"use client";

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

export default function DeleteProductPage() {
  const router = useRouter();
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


  const handleDelete = async () => {
    if (!product) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Produto deletado com sucesso!");
      router.push("/admin/editaroudeletar");
    } else {
      alert("Erro ao deletar produto");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-red-700">
          Deletar Produto
        </h2>
        <div className="flex flex-col gap-4">
          <p className="font-semibold">{product.title}</p>
          <p className="text-gray-500">R$ {product.price}</p>
          <p>{product.description}</p>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Deletar
          </button>
        </div>
      </div>
    </main>
  );
}
