import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alpha-Beta Pruning Visualization",
  description: "A basic demonstration of the Alpha-Beta Pruning algorithm.",
  // viewport: "width=device-width, initial-scale=1",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}