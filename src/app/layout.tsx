import type { Metadata } from "next";
import localFont from "next/font/local";
import "./main.css";


export const metadata: Metadata = {
  title: "NexusGames",
  description: "NexusGames Developed by makak0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

