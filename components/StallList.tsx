'use client';

import React from 'react';
import { Stall } from '@/types';
import { Star, Clock, Store } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';

export default function StallList({
  stalls,
  selectedStall,
  onSelectStall,
}: {
  stalls: Stall[];
  selectedStall: string;
  onSelectStall: (stallId: string) => void;
}) {
  const { playPop } = useSpeech();

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="sticker-badge sticker-num-1">1</span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Daftar Stan Kantin
          </h2>
          <span className="text-[11px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
            {stalls.length} Stan Buka
          </span>
        </div>
        <button
          onClick={() => {
            playPop();
            onSelectStall('all');
          }}
          className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
            selectedStall === 'all'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Lihat Semua
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stalls.map((stall) => {
          const isSelected = selectedStall === stall.id;
          return (
            <div
              key={stall.id}
              onClick={() => {
                playPop();
                onSelectStall(isSelected ? 'all' : stall.id);
              }}
              className={`group bg-white rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md flex flex-col ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20 shadow-md'
                  : 'border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
                <img
                  src={stall.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
                  alt={stall.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-emerald-500/90 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-xs">
                  ● Buka
                </span>
                <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  <span>{stall.category || 'Kuliner'}</span>
                </span>
              </div>

              <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-heading line-clamp-1 group-hover:text-primary transition-colors">
                    {stall.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {stall.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-medium">
                  <div className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{stall.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{stall.openTime.split('WIB')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
