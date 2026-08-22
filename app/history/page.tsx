'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import { Receipt, Clock, ShoppingBag, RotateCw, CheckCircle2, ChevronRight } from 'lucide-react';
import DigitalReceiptModal from '@/components/DigitalReceiptModal';
import { Order } from '@/types';
import Link from 'next/link';

export default function HistoryPage() {
  const { orders, currentUser, addToCart, setIsCartOpen, menus } = useCart();
  const { playPop } = useSpeech();
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Filter orders for student
  const studentOrders = currentUser?.role === 'STUDENT'
    ? orders.filter((o) => o.userId === currentUser.id || o.userName === currentUser.name)
    : orders;

  const handleReorder = (order: Order) => {
    playPop();
    order.items.forEach((item) => {
      const match = menus.find((m) => m.id === item.menuItemId || m.name === item.name);
      if (match && match.isAvailable) {
        addToCart(match);
      }
    });
    setIsCartOpen(true);
  };

  const handleOpenReceipt = (order: Order) => {
    playPop();
    setSelectedReceiptOrder(order);
    setIsReceiptOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-2">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="sticker-badge sticker-num-9">9</span>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-heading">
              Riwayat Transaksi Saya
            </h1>
            <p className="text-xs text-slate-500">
              Catatan lengkap transaksi pemesanan makanan dan bukti struk digital.
            </p>
          </div>
        </div>
      </div>

      {studentOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 shadow-xs">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">Belum Ada Transaksi</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Pesanan yang telah Anda buat akan tercatat otomatis di sini.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-full shadow-md shadow-primary/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Mulai Pesan Sekarang</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {studentOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col gap-3"
            >
              <div className="flex items-start justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-primary font-heading tracking-wide">
                      {order.orderCode}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })} WIB
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">
                    {order.stallName || 'Stan Kantin PASTI78'}
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {order.status === 'READY' ? (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Siap Diambil</span>
                    </span>
                  ) : order.status === 'COOKING' ? (
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                      🍳 Dimasak
                    </span>
                  ) : order.status === 'PENDING' ? (
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                      📥 Diterima
                    </span>
                  ) : (
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                      ✅ Selesai
                    </span>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-1 text-xs text-slate-600">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      <strong>{item.quantity}x</strong> {item.name}
                    </span>
                    <span className="font-semibold text-slate-800">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Info Schedule & Payment */}
              <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl flex items-center justify-between">
                <span>Pengambilan: <strong>{order.pickupTime}</strong></span>
                <span>Bayar: <strong className="text-emerald-700">{order.paymentMethod}</strong></span>
              </div>

              {/* Footer Total & Actions */}
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs font-extrabold text-slate-900">
                  Total: <span className="text-primary text-sm font-heading">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenReceipt(order)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Lihat Struk</span>
                  </button>

                  <button
                    onClick={() => handleReorder(order)}
                    className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-primary border border-orange-200 text-xs font-bold rounded-xl flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Pesan Lagi</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Digital Receipt Modal */}
      {selectedReceiptOrder && (
        <DigitalReceiptModal
          isOpen={isReceiptOpen}
          onOpenChange={setIsReceiptOpen}
          order={selectedReceiptOrder}
        />
      )}

    </div>
  );
}
