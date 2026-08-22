'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import { Search, Plus, Minus, Flame, Check, Ban, Sparkles } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

export default function MenuCatalog({
  menus,
  selectedStall,
}: {
  menus: MenuItem[];
  selectedStall: string;
}) {
  const { cart, addToCart, updateQuantity } = useCart();
  const { playPop } = useSpeech();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter items
  const filteredMenus = menus.filter((item) => {
    if (selectedStall !== 'all' && item.stallId !== selectedStall) return false;
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <section>
      {/* Header with Badges 2, 3, 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="sticker-badge sticker-num-2">2</span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Katalog Makanan & Minuman
            </h2>
            <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              {filteredMenus.length} Menu
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dilengkapi informasi harga transparan (Fitur 3) dan status ketersediaan stok live (Fitur 4).
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari ayam geprek, boba, bakso..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Radix Tabs for Category Filtering */}
      <Tabs.Root value={activeCategory} onValueChange={(val) => { playPop(); setActiveCategory(val); }} className="mb-6">
        <Tabs.List className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Tabs.Trigger
            value="all"
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Menu
          </Tabs.Trigger>

          <Tabs.Trigger
            value="makanan"
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'makanan'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            🍛 Makanan Berat
          </Tabs.Trigger>

          <Tabs.Trigger
            value="minuman"
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'minuman'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            🧋 Minuman Segar
          </Tabs.Trigger>

          <Tabs.Trigger
            value="snack"
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'snack'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            🥐 Cemilan & Snack
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      {/* Menu Grid */}
      {filteredMenus.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <Search className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">Menu Tidak Ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci pencarian lain atau ubah filter stan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMenus.map((item) => {
            const cartItem = cart.find((c) => c.id === item.id);
            const qty = cartItem ? cartItem.quantity : 0;
            const isSoldOut = !item.isAvailable;

            return (
              <div
                key={item.id}
                className={`group bg-white rounded-2xl overflow-hidden border flex flex-col justify-between transition-all ${
                  isSoldOut
                    ? 'border-slate-200 bg-slate-50/70 opacity-80'
                    : 'border-slate-200/90 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Image & Badges */}
                <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      isSoldOut ? 'grayscale contrast-75' : ''
                    }`}
                  />

                  {/* Fitur 4: Ketersediaan Stok Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    {isSoldOut ? (
                      <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Ban className="w-3 h-3" />
                        <span>Stok Habis</span>
                      </span>
                    ) : (
                      <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Tersedia</span>
                      </span>
                    )}

                    {item.isBestSeller && !isSoldOut && (
                      <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-white" />
                        <span>Favorit</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Body & Description */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-heading line-clamp-1 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {item.description || 'Pilihan menu nikmat dan bergizi siap santap.'}
                    </p>
                  </div>

                  {/* Fitur 3: Harga & Tombol Aksi */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex flex-col">
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-[10px] text-slate-400 line-through">
                          Rp {item.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className="text-sm font-extrabold text-primary font-heading">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Fitur 4: Tombol nonaktif jika Stok Habis */}
                    {isSoldOut ? (
                      <button
                        disabled
                        className="px-3 py-1.5 bg-slate-200 text-slate-400 text-xs font-bold rounded-full cursor-not-allowed flex items-center gap-1"
                        title="Menu tidak dapat dipesan karena stok habis"
                      >
                        <Ban className="w-3.5 h-3.5" />
                        <span>Habis</span>
                      </button>
                    ) : qty > 0 ? (
                      <div className="flex items-center bg-orange-50 border border-orange-200 rounded-full p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-white text-slate-800 flex items-center justify-center font-bold shadow-xs hover:bg-orange-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold text-slate-900 px-2.5">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-xs hover:bg-primary-dark"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-full shadow-xs shadow-primary/20 flex items-center gap-1 transition-transform active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
