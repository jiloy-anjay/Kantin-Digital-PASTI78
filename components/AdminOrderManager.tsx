'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import {
  Wallet,
  Flame,
  CheckCircle2,
  ListOrdered,
  UtensilsCrossed,
  ChefHat,
  BellRing,
  CheckCheck,
  Ban,
  Check,
} from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';

export default function AdminOrderManager() {
  const { orders, updateOrderStatus, menus, toggleMenuAvailability, currentUser } = useCart();
  const { playPop } = useSpeech();
  const [activeTab, setActiveTab] = useState('orders');

  // Filter stall items for this seller
  const stallOrders = orders;
  const stallMenus = menus.filter((m) => m.stallId === 'stan-1'); // Default to Stan 1 Bu Siti for admin demo

  const totalRevenue = stallOrders
    .filter((o) => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const activeCount = stallOrders.filter(
    (o) => o.status === 'PENDING' || o.status === 'COOKING' || o.status === 'READY'
  ).length;

  const completedCount = stallOrders.filter((o) => o.status === 'COMPLETED').length;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900 font-heading">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Total Omset Penjualan Hari Ini</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-primary flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900 font-heading">{activeCount}</div>
            <div className="text-[11px] text-slate-500 font-medium">Pesanan Antrian Aktif</div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900 font-heading">{completedCount}</div>
            <div className="text-[11px] text-slate-500 font-medium">Pesanan Berhasil Diserahkan</div>
          </div>
        </div>
      </div>

      {/* Radix Tabs */}
      <Tabs.Root value={activeTab} onValueChange={(val) => { playPop(); setActiveTab(val); }}>
        <Tabs.List className="flex gap-2 border-b border-slate-200 pb-3">
          <Tabs.Trigger
            value="orders"
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>Antrian Pesanan Pelanggan ({stallOrders.length})</span>
          </Tabs.Trigger>

          <Tabs.Trigger
            value="inventory"
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'inventory'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Kelola Ketersediaan Menu ({stallMenus.length})</span>
          </Tabs.Trigger>
        </Tabs.List>

        {/* TAB 1: ORDER QUEUE */}
        <Tabs.Content value="orders" className="pt-4 flex flex-col gap-3">
          {stallOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
              Belum ada antrian pesanan baru.
            </div>
          ) : (
            stallOrders.map((order) => (
              <div
                key={order.id}
                className={`p-4 bg-white rounded-2xl border transition-all flex flex-col gap-3 ${
                  order.status === 'READY'
                    ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/20'
                    : 'border-slate-200/90 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-primary font-heading tracking-wide">
                        {order.orderCode}
                      </span>
                      {order.isPreOrder ? (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          PRE-ORDER: {order.pickupTime}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                          LANGSUNG SEKARANG
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      Pemesan: <strong>{order.userName}</strong> {order.userNisn && `(NISN: ${order.userNisn})`}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {order.status === 'PENDING' && (
                      <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                        📥 Masuk
                      </span>
                    )}
                    {order.status === 'COOKING' && (
                      <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                        🍳 Sedang Dimasak
                      </span>
                    )}
                    {order.status === 'READY' && (
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        🛎️ Siap Diambil
                      </span>
                    )}
                    {order.status === 'COMPLETED' && (
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        ✅ Selesai
                      </span>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="p-3 bg-slate-50 rounded-xl text-xs flex flex-col gap-1">
                  <div className="font-semibold text-slate-800">
                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                  {order.notes && (
                    <div className="text-amber-800 text-[11px] font-medium mt-1">
                      📝 Catatan: "{order.notes}"
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <div className="text-xs font-bold text-slate-900">
                    Total: <span className="text-primary">Rp {order.totalPrice.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'COOKING')}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1"
                        >
                          <ChefHat className="w-3.5 h-3.5" />
                          <span>Mulai Masak</span>
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'READY')}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <BellRing className="w-3.5 h-3.5" />
                          <span>Siap Diambil</span>
                        </button>
                      </>
                    )}

                    {order.status === 'COOKING' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'READY')}
                        className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                      >
                        <BellRing className="w-3.5 h-3.5" />
                        <span>Tandai Siap Diambil 🛎️</span>
                      </button>
                    )}

                    {order.status === 'READY' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Konfirmasi Pengambilan ✅</span>
                      </button>
                    )}

                    {order.status === 'COMPLETED' && (
                      <span className="text-xs font-bold text-emerald-700">Pesanan telah diserahkan</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </Tabs.Content>

        {/* TAB 2: MENU INVENTORY & STOCK TOGGLE (FITUR 4) */}
        <Tabs.Content value="inventory" className="pt-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="grid grid-cols-12 p-3 bg-slate-100/80 text-[11px] font-extrabold text-slate-500 border-b border-slate-200">
              <div className="col-span-2">FOTO</div>
              <div className="col-span-6">NAMA MENU</div>
              <div className="col-span-2">HARGA</div>
              <div className="col-span-2 text-right">STATUS STOK</div>
            </div>

            <div className="divide-y divide-slate-100">
              {stallMenus.map((menu) => (
                <div key={menu.id} className="grid grid-cols-12 p-3 items-center text-xs">
                  <div className="col-span-2">
                    <img
                      src={menu.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}
                      alt={menu.name}
                      className="w-12 h-10 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-6 pr-2">
                    <div className="font-bold text-slate-900">{menu.name}</div>
                    <div className="text-[10px] text-slate-400 uppercase">{menu.category}</div>
                  </div>
                  <div className="col-span-2 font-bold text-primary">
                    Rp {menu.price.toLocaleString('id-ID')}
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <span className={`text-[10px] font-bold ${menu.isAvailable ? 'text-emerald-600' : 'text-red-500'}`}>
                      {menu.isAvailable ? 'Tersedia' : 'Habis'}
                    </span>
                    <Switch.Root
                      checked={menu.isAvailable}
                      onCheckedChange={() => toggleMenuAvailability(menu.id)}
                      className="w-8 h-4 bg-slate-300 rounded-full relative data-[state=checked]:bg-emerald-500 outline-none cursor-pointer"
                    >
                      <Switch.Thumb className="block w-3 h-3 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[16px]" />
                    </Switch.Root>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

    </div>
  );
}
