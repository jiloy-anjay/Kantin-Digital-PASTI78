'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import {
  Utensils,
  LayoutGrid,
  Clock,
  BookOpen,
  ShoppingBag,
  Volume2,
  VolumeX,
  CreditCard,
  LogOut,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { INITIAL_USERS } from '@/lib/mock-data';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setCurrentUser, totalItems, setIsCartOpen } = useCart();
  const { isVoiceEnabled, toggleVoice } = useSpeech();

  const isStudent = currentUser?.role === 'STUDENT';
  const isAdmin = currentUser?.role === 'SELLER';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-slate-900 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
            <Utensils className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg leading-tight font-heading">Kantin Digital</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide">
                PASTI78
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Pemesanan Makanan Pintar</span>
          </div>
        </Link>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/'
                ? 'bg-white text-primary shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Katalog Menu</span>
          </Link>

          <Link
            href="/history"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/history'
                ? 'bg-white text-primary shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Riwayat Pesanan</span>
          </Link>

          <Link
            href="/guide"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/guide'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Panduan PASTI78</span>
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                pathname === '/admin'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Stan</span>
            </Link>
          )}
        </nav>

        {/* Right Section: Voice Toggle, User Profile & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Voice Notification Toggle (Web Speech API) */}
          <button
            onClick={toggleVoice}
            title={isVoiceEnabled ? 'Suara Aktif (Klik untuk Mute)' : 'Suara Nonaktif (Klik untuk Aktifkan)'}
            className={`p-2 rounded-full border transition-all flex items-center gap-1 text-xs font-bold ${
              isVoiceEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden lg:inline">{isVoiceEnabled ? 'Suara ON' : 'Mute'}</span>
          </button>

          {/* User Profile Dropdown (Radix DropdownMenu) */}
          {currentUser ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 p-1.5 sm:px-3 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-all text-left">
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-white"
                  />
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {isStudent ? `Siswa (NISN: ${currentUser.nisn})` : 'Admin Stan'}
                    </span>
                  </div>
                  {isStudent && (
                    <div className="hidden md:flex items-center gap-1 text-[11px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full ml-1">
                      <CreditCard className="w-3 h-3" />
                      <span>Rp {currentUser.balance.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="bg-white rounded-2xl p-2 shadow-xl border border-slate-100 min-w-[220px] text-xs font-semibold animate-slide-up z-50"
                  sideOffset={8}
                  align="end"
                >
                  <div className="p-2 border-b border-slate-100 mb-1">
                    <div className="text-slate-900 font-bold">{currentUser.name}</div>
                    <div className="text-slate-400 text-[11px] font-normal">{currentUser.email}</div>
                    {isStudent && (
                      <div className="mt-2 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md flex justify-between items-center">
                        <span>Saldo Smart Card:</span>
                        <strong>Rp {currentUser.balance.toLocaleString('id-ID')}</strong>
                      </div>
                    )}
                  </div>

                  <div className="px-2 py-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Ganti Akun Cepat (Demo)
                  </div>
                  
                  <DropdownMenu.Item
                    onClick={() => setCurrentUser(INITIAL_USERS[0])}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer outline-none text-slate-700"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Siswa: Ahmad Rizky</span>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    onClick={() => setCurrentUser(INITIAL_USERS[1])}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer outline-none text-slate-700"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Siswi: Siti Nurhaliza</span>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    onClick={() => {
                      setCurrentUser(INITIAL_USERS[2]);
                      router.push('/admin');
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer outline-none text-slate-700"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                    <span>Admin: Stan Bu Siti</span>
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />

                  <DropdownMenu.Item
                    onClick={() => {
                      setCurrentUser(null);
                      router.push('/login');
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer outline-none"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Akun</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold shadow-md shadow-primary/20 transition-all"
            >
              Masuk
            </Link>
          )}

          {/* Cart Trigger Button */}
          {isStudent && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all shadow-md"
              title="Buka Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce-subtle">
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
