'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import StallList from '@/components/StallList';
import MenuCatalog from '@/components/MenuCatalog';
import OrderTracker from '@/components/OrderTracker';
import OnboardingModal from '@/components/OnboardingModal';
import { INITIAL_STALLS } from '@/lib/mock-data';
import { Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { menus } = useCart();
  const { playPop } = useSpeech();
  const [selectedStall, setSelectedStall] = useState<string>('all');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Hero Banner with 9 PASTI78 Feature Stickers */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2B1E16] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KANTIN DIGITAL TERINTEGRASI PASTI78</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                Pesan Makanan Praktis Bebas Antre
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1.5 leading-relaxed">
                Nikmati menu kantin sekolah dengan sistem Pre-Order terjadwal, pembayaran nontunai aman, dan konfirmasi suara pintar.
              </p>
            </div>

            <button
              onClick={() => {
                playPop();
                setIsGuideOpen(true);
              }}
              className="self-start md:self-auto px-4 py-2.5 bg-white text-slate-900 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-slate-100 transition-all shadow-md active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-primary" />
              <span>Panduan Penggunaan</span>
            </button>
          </div>

          {/* 9 Fitur Utama Interactive Stickers Grid (Images 1, 2, 3) */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 pt-2 border-t border-white/10">
            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 1: Daftar Stan Kantin"
            >
              <span className="sticker-badge sticker-num-1">1</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Daftar Stan</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 2: Katalog Makanan & Minuman"
            >
              <span className="sticker-badge sticker-num-2">2</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Katalog Menu</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 3: Harga Menu & Total Kalkulasi"
            >
              <span className="sticker-badge sticker-num-3">3</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Harga Menu</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 4: Informasi Ketersediaan Menu"
            >
              <span className="sticker-badge sticker-num-4">4</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Status Stok</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 5: Sistem Pre-Order"
            >
              <span className="sticker-badge sticker-num-5">5</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Pre-Order</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 6: Pembayaran Nontunai"
            >
              <span className="sticker-badge sticker-num-6">6</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Nontunai</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 7: Kode/Nomor Pesanan Unik"
            >
              <span className="sticker-badge sticker-num-7">7</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Kode Pesanan</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 8: Informasi Status Pesanan Real-time"
            >
              <span className="sticker-badge sticker-num-8">8</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Live Tracker</div>
            </div>

            <div
              onClick={() => { playPop(); setIsGuideOpen(true); }}
              className="p-2 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-center cursor-pointer transition-all hover:-translate-y-1 border border-white/10"
              title="Fitur 9: Riwayat Transaksi"
            >
              <span className="sticker-badge sticker-num-9">9</span>
              <div className="text-[10px] font-semibold text-slate-200 mt-1 line-clamp-1">Riwayat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur 8: Live Progress Tracker (If student has active order) */}
      <OrderTracker />

      {/* Fitur 1: Daftar Stan Kantin */}
      <StallList
        stalls={INITIAL_STALLS}
        selectedStall={selectedStall}
        onSelectStall={setSelectedStall}
      />

      {/* Fitur 2, 3, 4: Katalog Makanan, Harga, & Ketersediaan */}
      <MenuCatalog
        menus={menus}
        selectedStall={selectedStall}
      />

      {/* Onboarding Dialog Modal */}
      <OnboardingModal
        isOpen={isGuideOpen}
        onOpenChange={setIsGuideOpen}
      />

    </div>
  );
}
