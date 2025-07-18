// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Importe o componente Navbar que acabamos de criar
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Estoque e Vendas",
  description: "Gerenciado com Next.js e Laravel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-50`}>
        {/* 2. Adicione a Navbar aqui, antes do {children} */}
        <Navbar />
        
        {/* O conteúdo de cada página será renderizado aqui */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}