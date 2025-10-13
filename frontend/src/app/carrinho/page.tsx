"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigation = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    setCart(saved ? JSON.parse(saved) : []);
  }, []);

  function handleRemove(id: string) {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleClear() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  function handleBuy() {
    const token = localStorage.getItem("token");
    if (token) {
    navigation.push("/pagamento");
    } else {
    alert("Você precisa estar logado para continuar");
    navigation.push("/login");
    }
  }


  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const frete = 28.0;
  const totalComFrete = total + frete;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-2 sm:p-8">
      <h1 className="text-2xl font-bold mb-8">Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500">Seu carrinho está vazio.</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Coluna dos produtos */}
          <div className="flex-1 overflow-auto max-h-[70vh] bg-white rounded-lg shadow p-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b border-gray-200 py-4 last:border-b-0"
              >
                <div className="w-full flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded object-contain bg-gray-100 mb-2 sm:mb-0"
                    unoptimized
                  />
                  <div className="flex-1 w-full flex flex-col items-center sm:items-start">
                    <h2 className="text-lg font-bold text-center sm:text-left mb-2">
                      {item.title}
                    </h2>
                    <div className="flex flex-col w-full items-center sm:items-start">
                      <div className="text-sm text-gray-600">
                        Qtd: {item.quantity}
                      </div>
                      <div className="text-sm text-gray-600">
                        Preço: R${" "}
                        {item.price.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                          useGrouping: true,
                        })}
                      </div>
                      <div className="text-sm text-gray-600">
                        Subtotal: R${" "}
                        {(item.price * item.quantity).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                          useGrouping: true,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white rounded px-4 py-2 font-semibold hover:bg-red-600 mt-2 sm:mt-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          {/* Coluna do resumo */}
          <div className="lg:w-[350px] w-full bg-white rounded-lg shadow p-6 h-fit lg:sticky lg:top-8 flex flex-col gap-4">
            <div className="text-lg font-bold mb-2">Resumo</div>
            <div className="flex justify-between text-gray-700">
              <span>Valor dos Produtos:</span>
              <span>
                R${" "}
                {total.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </span>
            </div>
            {/*  frete */}
            <div className="flex justify-between text-gray-700">
              <span>Frete:</span>
              <span>R$ 28,00</span>
            </div>
            <div className="flex justify-between text-green-600 font-bold">
              <span>Total:</span>
              <span>
                R${" "}
                {totalComFrete.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </span>
            </div>
            <button
              onClick={handleBuy}
              className="bg-orange-500 text-white rounded px-6 py-3 font-semibold hover:bg-orange-600 w-full mt-2 uppercase text-sm"
            >
              Continuar
            </button>
            <button
              onClick={handleClear}
              className="bg-orange-500 text-white rounded px-6 py-3 font-semibold hover:bg-orange-600 w-full"
            >
              <span className="flex justify-center gap-3 uppercase text-sm">
                <ShoppingCart />
                Limpar Carrinho
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
