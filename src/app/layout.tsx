import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import "./globals.css";
import { ReactNode } from "react";
import ClientSessionProvider from "@/components/ClientSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashy",
  description: "Your Dashboard for life",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Task App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ClientSessionProvider>
          <main>
            {/* <Navbar></Navbar> */}
            {children}
          </main>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
