'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Order } from '@/types';
import { X, Receipt, CheckCircle2, Printer, Clock } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import Link from 'next/link';

export default function DigitalReceiptModal({
  isOpen,
  onOpenChange,
  order,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}) {
  const { playPop } = useSpeech();

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="radix-dialog-overlay" />
        <Dialog.Content className="radix-dialog-content max-w-md">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Receipt className="w-4 h-4" />
              </div>
              <Dialog.Title className="text-sm font-bold text-slate-900 font-heading">
                Struk Pesanan Digital
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                onClick={playPop}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Fitur 7: Kode Pesanan Hero Box */}
          <div className="my-4 p-4 bg-orange-50/80 border-2 border-dashed border-orange-300 rounded-2xl text-center flex flex-col items-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
              KODE PENGAMBILAN PESANAN
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-heading tracking-wider my-1">
              {order.orderCode}
            </div>
            <div className="font-mono text-xs text-slate-400 tracking-widest my-1">
              ||| ||||| || |||| ||||| |||
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Tunjukkan kode ini kepada petugas stan saat mengambil makanan.
            </p>
          </div>

          {/* Order Details */}
          <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs flex flex-col gap-1.5 mb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Pemesan:</span>
              <strong className="text-slate-800">{order.userName || 'Siswa'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Jadwal Ambil:</span>
              <strong className="text-primary">{order.pickupTime}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Metode Bayar:</span>
              <strong className="text-emerald-700">{order.paymentMethod} (Lunas)</strong>
            </div>
          </div>

          {/* Items breakdown */}
          <div className="border-t border-b border-dashed border-slate-200 py-3 mb-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Rincian Menu
            </div>
            <div className="flex flex-col gap-1.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-slate-700">
                  <span>
                    <strong>{item.quantity}x</strong> {item.name}
                  </span>
                  <span className="font-bold">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex justify-between items-center text-sm font-extrabold text-slate-900 mb-5">
            <span>TOTAL PEMBAYARAN:</span>
            <span className="text-primary font-heading text-base">
              Rp {order.totalPrice.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Struk</span>
            </button>

            <button
              onClick={() => onOpenChange(false)}
              className="flex-1.5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pantau Status</span>
            </button>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
