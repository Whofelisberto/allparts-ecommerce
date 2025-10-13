'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const navigation = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
    navigation.push("/login");
    }
  }, [navigation]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="max-w-md md:w-64 bg-white shadow-lg p-4 md:p-6 flex flex-col gap-6 md:min-h-screen">
        <h2 className="text-xl font-bold text-black mb-4">ADMIN</h2>
        <nav className="flex flex-col gap-4">
          <Link
            href="/admin/orders"
            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700 text-center uppercase text-sm"
          >
            Ver Pedidos
          </Link>
          <Link
            href="/admin/products/"
            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700 text-center uppercase text-sm"
          >
            Criar Produto
          </Link>
          <Link
            href="/admin/editaroudeletar"
            className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-700 text-center uppercase text-sm"
          >
            Deletar ou Editar Produto
          </Link>
        </nav>
      </aside>

      <section className="flex-1 p-4 md:p-10">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
          <h1 className="text-2xl font-bold mb-4 text-black uppercase">
            Painel Administrativo
          </h1>
          <p className="mb-6 text-gray-700">
            Bem-vindo ao painel administrativo do AllParts Ecommerce.
          </p>
          <div className="mt-8">
            <p className="text-gray-500">
              Selecione uma opção na barra lateral para começar.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
