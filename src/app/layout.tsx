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
  description: "ENRYSA connects businesses and consumers in Bangladesh with products, suppliers, and opportunities across China. Cross-border commerce infrastructure.",
  keywords: ["ENRYSA", "China", "Bangladesh", "cross-border commerce", "product sourcing", "B2B", "B2C", "import", "export"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ENRYSA — Trade Without Borders",
    description: "Cross-border commerce connecting China and Bangladesh.",
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