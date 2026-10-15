import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReferralBanner from '../components/ReferralBanner';

export const metadata: Metadata = {
  title: "Ahalya's Boutique | Madurai Handlooms & Custom Bridal Couture",
  description: "Authentic Madurai Sungudi, pure Kanchipuram silks, and hand-embroidered bridal blouses in Madurai.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#fcfaf7] text-stone-900 flex flex-col min-h-screen">
        <ReferralBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}