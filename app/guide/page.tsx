'use client';

import React, { useState } from 'react';
import { useSpeech } from '@/hooks/useSpeech';
import OnboardingModal from '@/components/OnboardingModal';
import {
  Sparkles,
  BookOpen,
  Store,
  UtensilsCrossed,
  Tag,
  Ban,
  Clock,
  CreditCard,
  Receipt,
  Radio,
  History,
  Volume2,
} from 'lucide-react';

export default function GuidePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playPop } = useSpeech();

  return (
    <div className="max-w-4xl mx-auto py-2 flex flex-col gap-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-extrabold rounded-full mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>PANDUAN LENGKAP KANTIN DIGITAL PASTI78</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
          Cara Menggunakan Aplikasi Kantin Digital
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1 mb-5 leading-relaxed">
          Ikuti alur praktis pemesanan makanan kantin sekolah/kampus bebas antre dengan sistem Pre-Order dan notifikasi suara pintar.
        </p>

        <button
          onClick={() => {
            playPop();
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold shadow-md shadow-primary/20 flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Buka Tutorial Interaktif 5 Langkah</span>
        </button>
      </div>

      {/* 9 Fitur Utama Detailed Showcase */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Rincian 9 Fitur Utama Pemesanan Makanan</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Fitur 1 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-1">1</span>
              <Store className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Daftar Stan Kantin</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pilihan lengkap stan & penjual makanan kantin dengan informasi jam buka, kategori menu, dan ulasan rating.
            </p>
          </div>

          {/* Fitur 2 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-2">2</span>
              <UtensilsCrossed className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Katalog Makanan & Minuman</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tampilan menu terorganisir per kategori lengkap dengan foto makanan berkualitas, nama menu, dan deskripsi porsi.
            </p>
          </div>

          {/* Fitur 3 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-3">3</span>
              <Tag className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Harga Menu & Kalkulasi Otomatis</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Label harga transparan dan kalkulasi total keranjang belanja terhitung otomatis secara real-time.
            </p>
          </div>

          {/* Fitur 4 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-4">4</span>
              <Ban className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Informasi Ketersediaan Menu</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Label status stok (Tersedia / Habis) dengan tombol beli yang otomatis nonaktif (disabled) jika stok habis.
            </p>
          </div>

          {/* Fitur 5 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-5">5</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Sistem Pre-Order Terjadwal</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pilihan jadwal pengambilan makanan pada Jam Istirahat 1, Jam Istirahat 2, jam pulang, atau jam kustom.
            </p>
          </div>

          {/* Fitur 6 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-6">6</span>
              <CreditCard className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Pembayaran Nontunai Digital</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dukungan pembayaran digital instan: QRIS Nasional, Kartu Pelajar (E-Money), dan E-Wallet (GoPay, DANA, OVO).
            </p>
          </div>

          {/* Fitur 7 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-7">7</span>
              <Receipt className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Kode / Nomor Pesanan Unik</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generasi kode transaksi unik otomatis (ORD-XXXX) dilengkapi struk digital dan barcode untuk validasi pengambilan stan.
            </p>
          </div>

          {/* Fitur 8 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-8">8</span>
              <Radio className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Live Status Tracker &amp; Voice TTS</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Progress stepper (Diterima &rarr; Dimasak &rarr; Siap Diambil) dan suara otomatis yang memberitahu saat pesanan siap diambil.
            </p>
          </div>

          {/* Fitur 9 */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="sticker-badge sticker-num-9">9</span>
              <History className="w-4 h-4 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Riwayat Transaksi & Re-Order</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Rekapitulasi seluruh riwayat jajan kantin lengkap dengan opsi cetak struk dan pemesanan ulang 1-klik.
            </p>
          </div>

        </div>
      </div>

      <OnboardingModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

    </div>
  );
}
