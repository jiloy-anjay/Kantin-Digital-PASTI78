'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, LogIn, Store, CreditCard, Clock, Receipt, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

const GUIDE_STEPS = [
  {
    step: 1,
    title: 'Masuk ke Akun (Login)',
    badge: 'Langkah 1',
    icon: LogIn,
    desc: 'Pilih peran Anda: Siswa/Pembeli atau Admin Stan. Masukkan NISN/Username dan Kata Sandi, lalu masuk ke aplikasi.',
    tip: '💡 Saldo Kartu Pelajar Digital akan otomatis tersinkronisasi dan siap dipakai jajan hemat!',
  },
  {
    step: 2,
    title: 'Memilih Stan & Menu',
    badge: 'Langkah 2',
    icon: Store,
    desc: 'Pilih stan favorit di Daftar Stan. Cek status menu: label "Tersedia" dapat langsung dipesan, sedangkan label "Habis" otomatis nonaktif. Klik + Tambah untuk memasukkan ke keranjang.',
    tip: '💡 Gunakan filter kategori Makanan Berat, Minuman, atau Snack untuk pencarian cepat.',
  },
  {
    step: 3,
    title: 'Pemesanan & Pembayaran Nontunai',
    badge: 'Langkah 3',
    icon: CreditCard,
    desc: 'Aktifkan opsi Pre-Order untuk memilih jam istirahat pengambilan (Jam Istirahat 1 / Jam Istirahat 2). Pilih pembayaran QRIS, Kartu Pelajar (E-Money), atau E-Wallet.',
    tip: '💡 Gunakan kode promo "PASTI78" saat checkout untuk potongan harga ekstra!',
  },
  {
    step: 4,
    title: 'Memantau Pesanan & Fitur Suara',
    badge: 'Langkah 4',
    icon: Clock,
    desc: 'Dapatkan Kode Pesanan Unik (contoh: ORD-8492). Pantau live progress tracker (Diterima -> Dimasak -> Siap Diambil). Fitur suara akan otomatis memberitahu saat makanan siap!',
    tip: '💡 Tunjukkan kode pesanan ke petugas stan saat status berubah menjadi "Siap Diambil".',
  },
  {
    step: 5,
    title: 'Cek Riwayat Transaksi',
    badge: 'Langkah 5',
    icon: Receipt,
    desc: 'Seluruh pesanan selesai tersimpan di Riwayat Transaksi untuk memantau pengeluaran harian dan kemudahan pesan ulang (Re-order) dengan 1 klik.',
    tip: '💡 Struk digital dapat dicetak atau disimpan kapan saja sebagai bukti pembelian sah.',
  },
];

export default function OnboardingModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const { playPop } = useSpeech();

  const stepData = GUIDE_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === GUIDE_STEPS.length - 1;
  const StepIcon = stepData.icon;

  const handleNext = () => {
    playPop();
    if (!isLast) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    playPop();
    if (!isFirst) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="radix-dialog-overlay" />
        <Dialog.Content className="radix-dialog-content max-w-lg">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <Dialog.Title className="text-base font-bold text-slate-900">
                Panduan Penggunaan Kantin Digital
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                onClick={playPop}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Body Card */}
          <div className="my-5 p-5 bg-gradient-to-br from-orange-50/60 to-amber-50/40 rounded-2xl border border-orange-100/80 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary bg-white px-2.5 py-1 rounded-full border border-orange-200/80 shadow-xs">
                {stepData.badge}
              </span>
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/25">
                <StepIcon className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
              {stepData.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {stepData.desc}
            </p>

            <div className="mt-2 p-3 bg-white/90 rounded-xl border-l-4 border-primary text-[11px] font-semibold text-amber-900 shadow-xs">
              {stepData.tip}
            </div>
          </div>

          {/* Stepper Dots & Controls */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              {GUIDE_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playPop();
                    setCurrentStep(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentStep ? 'w-6 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-dark flex items-center gap-1.5 shadow-md shadow-primary/20 transition-all"
              >
                <span>{isLast ? 'Mulai Pesan Makanan' : 'Lanjut'}</span>
                {isLast ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
