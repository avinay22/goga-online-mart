import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { MarketplaceProvider } from "@/lib/store";
import RoleSwitcherBar from "@/components/navigation/RoleSwitcherBar";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import BottomNav from "@/components/navigation/BottomNav";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C71F2D",
};

export const metadata: Metadata = {
  title: "Gogamukh Online Mart — Our Gogamukh • Our Shops • Our Doorsteps",
  description:
    "Complete hyper-local shopping and Tum-Tum delivery ecosystem for Gogamukh, Dhemaji, Assam. Fresh groceries, delicious restaurant thalis, medicines, daily tiffin, and authentic Assamese & Mising handloom delivered directly to your doorstep.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gogamukh Mart",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FFFDF8] text-charcoal-900 selection:bg-[#F5D061] selection:text-forest-950 antialiased overflow-x-hidden">
        <MarketplaceProvider>
          <RoleSwitcherBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNav />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
