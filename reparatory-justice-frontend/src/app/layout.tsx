import { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Ministry of Foreign Affairs, Republic of Ghana",
  description: "Official portal for the Ministry of Foreign Affairs, Republic of Ghana. Advancing Ghana's diplomatic interests and protecting her citizens worldwide.",
  openGraph: {
    title: "Ministry of Foreign Affairs, Republic of Ghana",
    description: "Official portal for the Ministry of Foreign Affairs, Republic of Ghana. Advancing Ghana's diplomatic interests and protecting her citizens worldwide.",
    type: "website",
    url: "https://mfa.gov.gh", // Updated official domain
    images: [
      {
        url: "/ghana-coat-of-arms.png",
        width: 1200,
        height: 630,
        alt: "Republic of Ghana Coat of Arms",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Toaster position="top-right" />
        <TopBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
