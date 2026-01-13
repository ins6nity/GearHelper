import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BDO Gear Helper - Análise de Gear com IA",
  description: "Ferramenta para otimização de gear em Black Desert Online. Analisa o teu equipamento atual e recebe recomendações do próximo upgrade mais barato baseado nos cálculos do BairogHaan.",
  keywords: ["BDO", "Black Desert Online", "Gear", "Enhancement", "Calculator", "Upgrade", "AP", "DP"],
  authors: [{ name: "Gear Helper" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
