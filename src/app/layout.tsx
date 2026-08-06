import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ENRYSA — Trade Without Borders",
  description: "ENRYSA connects businesses and consumers in Bangladesh with products, suppliers, and opportunities around the world. Global trade and commerce infrastructure.",
  keywords: ["ENRYSA", "Global Trade", "Bangladesh", "cross-border commerce", "product sourcing", "B2B", "B2C", "import", "export", "worldwide sourcing"],
  icons: {
    icon: "/enrysa-icon.png",
  },
  openGraph: {
    title: "ENRYSA — Trade Without Borders",
    description: "Global commerce infrastructure connecting Bangladesh to the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}