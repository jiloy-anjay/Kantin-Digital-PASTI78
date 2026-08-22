'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import AdminOrderManager from '@/components/AdminOrderManager';
import { ShieldCheck, Store, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { currentUser } = useCart();

  return (
    <div className="max-w-4xl mx-auto py-2 flex flex-col gap-6">
      
      {/* Header Seller Info */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'}
            alt="Admin Stall"
            className="w-12 h-12 rounded-2xl object-cover border-2 border-orange-200"
          />
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-orange-100 text-primary px-2.5 py-0.5 rounded-full mb-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>PANEL ADMIN PENJUAL KANTIN</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 font-heading">
              Stan 01 - Dapur Bu Siti
            </h1>
            <p className="text-xs text-slate-500">
              Pengelola: <strong>{currentUser?.name || 'Ibu Siti Rahayu'}</strong> ({currentUser?.email || 'admin_siti'})
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full transition-all"
        >
          Lihat Tampilan Pembeli ➔
        </Link>
      </div>

      {/* Admin Order Manager Component */}
      <AdminOrderManager />

    </div>
  );
}
