"use client";

import { jwtDecode } from "jwt-decode";

import {CircleUser, House, Menu, ShieldAlert, ShoppingCart, X,} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [name, setName] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      setName(name || "");
      setIsLogged(!!token);
      if (token) {
        try {
          const decoded: unknown = jwtDecode(token);

          if (
            typeof decoded === "object" &&
            decoded !== null &&
            "role" in decoded
          ) {
            setIsAdmin((decoded as { role?: string }).role === "admin");
          } else {
            setIsAdmin(false);
          }
        } catch (error: unknown) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <nav className="bg-black p-5">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <h1 className="text-white text-xl font-bold">AllParts Ecommerce</h1>
          </Link>
          {isLogged && (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-orange-500 font-semibold max-sm:text-xs md:text-lg">
                Olá, {name}
              </span>
              <button
                onClick={handleLogout}
                className="text-white px-3 font-semibold rounded hover:bg-neutral-700 cursor-pointer max-sm:text-sm md:text-lg"
              >
                Sair
              </button>
            </div>
          )}
        </div>

      { /* desktop */ }

        <ul className="hidden lg:flex space-x-4 font-semibold items-center">
          {isAdmin && (
            <li className="text-white">
              <Link className="flex gap-2" href="/admin">
                <ShieldAlert size={24} /> Painel Admin
              </Link>
            </li>
          )}

          <li className="text-white">
            <Link className="flex gap-2" href="/">
              <House size={24} /> Home
            </Link>
          </li>
          {!isLogged && (
            <li className="text-white">
              <Link className="flex gap-2" href="/login">
                <CircleUser size={24} /> Login
              </Link>
            </li>
          )}
          {isLogged && (
            <li className="text-white">
              <Link className="flex gap-2" href="/carrinho">
                <ShoppingCart size={24} /> Carrinho
              </Link>
            </li>
          )}
        </ul>

  { /* mobile */ }

        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-black z-50 shadow-lg flex flex-col p-8 transition-transform duration-300 ease-in-out transform -translate-x-0 animate-[slide-in_0.3s_ease-in-out]">
          <button
            className="self-end mb-8 text-white"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <ul className="flex flex-col gap-6 font-semibold">
            <li className="text-white">
              <Link
                className="flex gap-2"
                href="/"
                onClick={() => setMenuOpen(false)}
              >
                <House size={24} /> Home
              </Link>
            </li>
            {!isLogged && (
              <li className="text-white">
                <Link
                  className="flex gap-2"
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  <CircleUser size={24} /> Login
                </Link>
              </li>
            )}
            {isLogged && (
              <li className="text-white">
                <Link
                  className="flex gap-2"
                  href="/carrinho"
                  onClick={() => setMenuOpen(false)}
                >
                  <ShoppingCart size={24} /> Carrinho
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
