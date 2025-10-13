"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Coments from "../../../../components/Coments";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function ProductPage() {
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<string | null>(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);

  async function calcularFrete() {
    setCalculandoFrete(true);
    setFrete(null);
    setTimeout(() => {
      if (cep.length === 8) {
        setFrete("R$ 29,90");
      } else {
        setFrete("CEP inválido");
      }
      setCalculandoFrete(false);
    }, 1200);
  }

  const { id } = useParams();
  const navigation = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;

      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!res.ok) throw new Error("Produto não encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (err: unknown) {
        setProduct(null);
      }
    }
    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigation.push("/carrinho");
  }

  if (!product) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="flex flex-col gap-8 p-4 bg-white mx-auto min-h-screen w-full ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

        {/* conteudo esquerda */}
        <div className="flex justify-center items-start w-full">
          <Image
            src={product.image_url}
            alt={product.title}
            width={500}
            height={400}
            className="rounded-lg object-cover bg-white w-full max-w-[700px] h-auto"
            unoptimized
          />
        </div>

        {/* conteudo centro */}
        <div className="flex flex-col justify-start gap-6 w-full">
          <h1 className="text-xl text-black uppercase font-bold mb-2">
            {product.title}
          </h1>
          <p className="text-lg italic mb-2">
            <span className="font-bold">Descrição:</span> {product.description}
          </p>
        </div>

        {/* box compra */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 max-w-lg">
          <div className="text-2xl font-bold text-orange-600">
            R${" "}
            {product.price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="text-sm text-gray-500">Estoque: {product.stock}</div>
          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="text-sm">
              Qtd:
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white rounded px-4 py-2 font-semibold text-sm hover:bg-orange-600 cursor-pointer uppercase"
          >
            <span className="flex justify-center gap-2">
              <ShoppingCart /> Adicionar ao Carrinho
            </span>
          </button>

          {/* calculo de frete */}
          <div className="mt-2 flex flex-col gap-2 shadow p-4 rounded">
            <label
              htmlFor="cep"
              className="text-sm font-bold uppercase text-orange-600"
            >
              Consulte o frete:
            </label>
            <div className="flex gap-2 flex-wrap">
              <input
                id="cep"
                type="text"
                maxLength={8}
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                className="border rounded px-2 py-2 w-40"
              />
              <button
                type="button"
                onClick={calcularFrete}
                disabled={calculandoFrete || cep.length !== 8}
                className="bg-orange-500 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-orange-600 "
              >
                OK
              </button>
            </div>
            {calculandoFrete && (
              <span className="text-xs text-gray-500">Calculando...</span>
            )}
            {frete && (
              <span className="text-sm font-bold text-green-700">
                Frete: {frete}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Coments postId={String(id)} />
      </div>
    </div>
  );
}
