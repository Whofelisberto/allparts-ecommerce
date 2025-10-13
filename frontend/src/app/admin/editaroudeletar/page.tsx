"use client";

import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Link href="/admin/">
      <button className="bg-black text-white px-5 py-2 rounded mb-3 font-semibold cursor-pointer uppercase"><ArrowLeft /></button>
      </Link>
      <div className="max-w-screen mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 uppercase">
          Produtos Cadastrados
        </h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {products.length === 0 && <p>Nenhum produto cadastrado.</p>}
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <span className="font-semibold">{product.title}</span>
                  <span className="ml-2 text-gray-500">R$ {product.price}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/admin/editar/${product.id}`}
                    className="bg-orange-500 text-white px-2 py-1 rounded uppercase"
                  >
                    Editar
                  </a>
                  <a
                    href={`/admin/deletar/${product.id}`}
                    className="bg-black text-white px-2 py-1 rounded uppercase"
                  >
                    Deletar
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
