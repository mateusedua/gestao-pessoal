import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: '400',subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
