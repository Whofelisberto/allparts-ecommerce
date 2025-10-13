'use client'

import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from "react";

type Order = {
  id: number;
  user: string;
  total: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Substitua pela sua API real
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Link href="/admin/">
        <button className="bg-black text-white px-5 py-2 rounded mb-3 font-semibold cursor-pointer uppercase">
          <ArrowLeft />
        </button>
      </Link>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Pedidos</h2>
        <p className="mb-2 text-gray-700">Lista de pedidos realizados.</p>
        {loading ? (
          <p>Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          <table className="w-full border mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Cliente</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.user}</td>
                  <td className="py-2 px-4">R$ {order.total.toFixed(2)}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
