import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  display: "swap",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "ProtonFit Equipamentos",
    template: "%s | ProtonFit Equipamentos",
  },
  description:
    "Equipamentos profissionais para academias, estúdios e centros de treinamento.",
  metadataBase: new URL("https://protonfitequipamentos.com.br"),
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${openSans.variable}`}
    >
      <body className="font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

