import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: '400',subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} dark`}>{children}</body>
    </html>
  );
}
