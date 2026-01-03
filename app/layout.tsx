import type { Metadata } from "next";
import { Hanken_Grotesk, Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

  const hankenGrotesk = Hanken_Grotesk({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-hanken-grotesk',
    display: 'swap',
  })

  const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-bricolage',
    display: 'swap',
  })

  const spacegrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space',
    display: 'swap',
  })

  export const metadata: Metadata = {
    title: "Betamind",
    description: "Betamind is a hub where minds grow through mentorship. We make mentorship accessible and affordable for everyone.",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hankenGrotesk.variable} ${bricolage.variable}  antialiased`}
      >
        <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
