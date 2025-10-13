import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "AllParts Ecommerce",
  description: "O melhor lugar para comprar peças gamer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="Pt-BR">
      <body className="min-h-screen bg-orange-500">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
