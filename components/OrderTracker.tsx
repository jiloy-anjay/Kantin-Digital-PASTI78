'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import { Inbox, Flame, Bell, CheckCircle2, FastForward, Radio, Sparkles } from 'lucide-react';
import { OrderStatus } from '@/types';

export default function OrderTracker() {
  const { activeOrder, updateOrderStatus } = useCart();
  const { playPop } = useSpeech();

  if (!activeOrder) return null;

  const status = activeOrder.status;

  let progressWidth = '0%';
  let isPending = false;
  let isCooking = false;
  let isReady = false;

  if (status === 'PENDING') {
    progressWidth = '10%';
    isPending = true;
  } else if (status === 'COOKING') {
    progressWidth = '50%';
    isCooking = true;
  } else if (status === 'READY') {
    progressWidth = '100%';
    isReady = true;
  }

  const handleSimulateNext = () => {
    playPop();
    let nextStatus: OrderStatus = 'PENDING';
    if (status === 'PENDING') nextStatus = 'COOKING';
    else if (status === 'COOKING') nextStatus = 'READY';
    else if (status === 'READY') nextStatus = 'COMPLETED';

    updateOrderStatus(activeOrder.id, nextStatus);
  };

  return (
    <div className="mb-8 p-5 bg-white rounded-3xl border border-orange-200/80 shadow-md shadow-orange-500/5 animate-fade-in">
      
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-primary flex items-center justify-center font-bold">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
                FITUR 8: LIVE PROGRESS TRACKER
              </span>
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Real-Time
              </span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 font-heading">
              Pesanan: <span className="text-primary">{activeOrder.orderCode}</span>
            </h3>
          </div>
        </div>

        {/* Demo Fast-Forward Button */}
        <button
          onClick={handleSimulateNext}
          title="Klik untuk menguji simulasi alur status & notifikasi suara"
          className="self-start sm:self-auto px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-primary border border-orange-200 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>Simulasi Status (Demo)</span>
        </button>
      </div>

      {/* 3-Stage Progress Stepper */}
      <div className="relative my-6 px-4">
        {/* Gray Background Line */}
        <div className="absolute top-5 left-10 right-10 h-1 bg-slate-200 -z-0" />
        
        {/* Active Progress Line */}
        <div
          className="absolute top-5 left-10 h-1 bg-primary transition-all duration-500 -z-0"
          style={{ width: `calc(${progressWidth} - 20px)` }}
        />

        <div className="grid grid-cols-3 relative z-10 text-center">
          {/* Step 1: Diterima */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                isPending || isCooking || isReady
                  ? 'bg-primary text-white shadow-md shadow-primary/30 ring-4 ring-orange-100'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              <Inbox className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2">Diterima</span>
            <span className="text-[10px] text-slate-400">Masuk Antrian</span>
          </div>

          {/* Step 2: Dimasak */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                isCooking || isReady
                  ? 'bg-primary text-white shadow-md shadow-primary/30 ring-4 ring-orange-100'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2">Dimasak</span>
            <span className="text-[10px] text-slate-400">Sedang Disiapkan</span>
          </div>

          {/* Step 3: Siap Diambil */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                isReady
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-100 animate-pulse-success'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              <Bell className="w-4 h-4" />
            </div>
            <span className={`text-xs font-bold mt-2 ${isReady ? 'text-emerald-700 font-extrabold' : 'text-slate-800'}`}>
              Siap Diambil
            </span>
            <span className="text-[10px] text-slate-400">Ambil di Stan</span>
          </div>
        </div>
      </div>

      {/* Dynamic Status Callout Alert */}
      {isReady ? (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 animate-fade-in">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-extrabold">Makanan Siap Diambil! 🛎️</div>
            <div className="text-[11px] text-emerald-700">
              Silakan langsung menuju <strong>{activeOrder.stallName || 'Stan Kantin'}</strong> dan tunjukkan kode <strong>{activeOrder.orderCode}</strong>.
            </div>
          </div>
        </div>
      ) : isCooking ? (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-900 animate-fade-in">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-extrabold">Pesanan Sedang Dimasak fresh 🍳</div>
            <div className="text-[11px] text-amber-700">
              Penjual sedang memasak makanan Anda agar hangat dan lezat saat jam istirahat.
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3 text-blue-900 animate-fade-in">
          <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold">Pesanan Telah Diterima oleh Penjual 📥</div>
            <div className="text-[11px] text-blue-700">
              Penjual sedang memeriksa antrian dan bersiap memasak menu pesanan Anda.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
