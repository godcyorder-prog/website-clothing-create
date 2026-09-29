import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Zaria Atelier — Handcrafted Indian Couture",
  description:
    "Handcrafted silhouettes & handwoven Chanderi. A harmonious ode to Rajasthani block prints, raw mulberry silks, and timeless contemporary tailoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-on-surface antialiased">
        <StoreProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
          <WhatsAppButton />
        </StoreProvider>
      </body>
    </html>
  );
}
