import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     {children}
    </>
  );
}