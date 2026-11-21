import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// @ts-ignore: Next.js handles global CSS imports
import "./globals.css";

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
  description: "Betamind is an all-in-one platform for affordable mentorship, digital products, events, and live conferencing. Connect with experienced mentors, discover and sell digital products, host free or paid events, manage attendees, and create meaningful learning experiences — all in one place.",
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
