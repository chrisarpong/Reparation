import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Global Reparatory Justice Programme | Ministry of Foreign Affairs, Ghana",
  description: "Official Digital Registration Platform for the Global Reparatory Justice Programme managed by the Ministry of Foreign Affairs, Republic of Ghana.",
  openGraph: {
    title: "Global Reparatory Justice Programme | Ministry of Foreign Affairs, Ghana",
    description: "Official Digital Registration Platform for the Global Reparatory Justice Programme managed by the Ministry of Foreign Affairs, Republic of Ghana.",
    type: "website",
    url: "https://reparations.mfa.gov.gh", // Example official domain
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

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
