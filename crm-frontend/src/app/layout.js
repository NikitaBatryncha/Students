import { Open_Sans } from "next/font/google";
import "./globals.css";

const opensans = Open_Sans({subsets: ["latin", "cyrillic", "math", "symbols"], weight: "variable", style: "normal"});

export const metadata = {
  title: "skb.",
  description: "Организация - это просто!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={opensans.className}>{children}</body>
    </html>
  );
}
