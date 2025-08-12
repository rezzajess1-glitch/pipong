import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toney PiPong - Mini Tournament Management",
  description: "User-friendly ping pong tournament management application with mobile-first design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
