"use client";

import Image from "next/image";
import Link from "next/link";
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

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <main className="container mx-auto p-4 min-h-screen bg-white">
        <h1 className="text-2xl font-bold mb-6 mt-5 uppercase bg-orange-500  py-2 px-1">
          ofertas do dia 🔥
        </h1>
        <div className="border-t border-b py-3 border-gray-300 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-15 mb-15">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded shadow p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200">
                <Image
                  src={product.image_url}
                  alt={product.title}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover mb-2"
                  unoptimized
                />
                <h2 className="font-semibold text-md mb-2 line-clamp-2 uppercase">
                  {product.title}
                </h2>
                <p className="text-gray-600 mb-1 text-sm upp line-clamp-5">
                  {product.description}
                </p>
                <span className="text-white font-bold px-2 py-0.5 m-1  mt-2 bg-orange-500 rounded hover:bg-orange-600">
                  R$ {product.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
