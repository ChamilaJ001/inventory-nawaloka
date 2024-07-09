import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { ProductsProvider } from "@/context/ProductsContext";
// import { getServerSession } from "next-auth";
// import AuthProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "StockNova",
  description: "Inventory System for Nawaloka Opticals",
  icons: {
    icon: "/icons/logo-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        {/* <AuthProvider session={session}>{children}</AuthProvider> */}
        <ProductsProvider>{children}</ProductsProvider>
      </body>
    </html>
  );
}
