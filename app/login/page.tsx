'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import { INITIAL_USERS } from '@/lib/mock-data';
import { GraduationCap, Store, User, Lock, LogIn, Sparkles } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useCart();
  const { playPop, playChime } = useSpeech();

  const [role, setRole] = useState<'STUDENT' | 'SELLER'>('STUDENT');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playChime();

    if (role === 'STUDENT') {
      const student = INITIAL_USERS.find((u) => u.role === 'STUDENT') || INITIAL_USERS[0];
      setCurrentUser(student);
      router.push('/');
    } else {
      const seller = INITIAL_USERS.find((u) => u.role === 'SELLER') || INITIAL_USERS[2];
      setCurrentUser(seller);
      router.push('/admin');
    }
  };

  const handleQuickDemo = (userIndex: number) => {
    playPop();
    const user = INITIAL_USERS[userIndex];
    if (user.role === 'STUDENT') {
      setRole('STUDENT');
      setUsername(user.nisn || user.name);
      setPassword('password123');
    } else {
      setRole('SELLER');
      setUsername(user.email);
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl relative overflow-hidden">
        
        {/* Top Decorative bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-500 to-emerald-500" />

        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1 bg-orange-50 text-primary border border-orange-200 text-[11px] font-extrabold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PASTI78 DIGITAL CANTEEN</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">
            Masuk ke Kantin Digital
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Silakan masuk untuk mulai memesan makanan.
          </p>
        </div>

        {/* Role Selector Tabs (Radix Tabs) */}
        <Tabs.Root value={role} onValueChange={(val) => { playPop(); setRole(val as 'STUDENT' | 'SELLER'); }} className="mb-6">
          <Tabs.List className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <Tabs.Trigger
              value="STUDENT"
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                role === 'STUDENT' ? 'bg-white text-primary shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Siswa / Pembeli</span>
            </Tabs.Trigger>

            <Tabs.Trigger
              value="SELLER"
              className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                role === 'SELLER' ? 'bg-white text-primary shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Admin Stan / Penjual</span>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {role === 'STUDENT' ? 'Nama Pengguna / NISN' : 'Email / Akun Penjual'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'STUDENT' ? 'Contoh: 20240101 atau ahmad_rizky' : 'admin_siti@kantin.sch.id'}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all mt-2 active:scale-98"
          >
            <LogIn className="w-4 h-4" />
            <span>MASUK KE APLIKASI</span>
          </button>
        </form>

        {/* Quick Demo Section */}
        <div className="mt-6 pt-4 border-t border-dashed border-slate-200">
          <div className="text-[10px] font-extrabold uppercase text-slate-400 text-center tracking-wider mb-2.5">
            ⚡ Coba Akun Demo Cepat
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo(0)}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 text-left transition-all"
            >
              👨‍🎓 Siswa: Ahmad (NISN 20240101)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo(1)}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 text-left transition-all"
            >
              👩‍🎓 Siswi: Siti (NISN 20240102)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo(2)}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 text-left transition-all"
            >
              🏪 Admin: Stan Bu Siti
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo(3)}
              className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-700 text-left transition-all"
            >
              🏪 Admin: Stan Pak Joko
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-5">
          Belum punya akun? <span className="text-primary font-bold">Hubungi pihak pengelola kantin.</span>
        </p>

      </div>
    </div>
  );
}
