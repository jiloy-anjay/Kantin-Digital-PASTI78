import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kantin Digital PASTI78 | Pemesanan Makanan Pintar & Modern',
  description: 'Aplikasi web pemesanan makanan kantin sekolah/kampus berbasis Next.js, Radix UI, Prisma ORM, dan Voice Notification.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[#F8FAFC] text-slate-800 min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
