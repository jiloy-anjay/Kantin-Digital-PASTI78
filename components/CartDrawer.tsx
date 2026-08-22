'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { useCart } from '@/hooks/useCart';
import { useSpeech } from '@/hooks/useSpeech';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Clock,
  CreditCard,
  QrCode,
  Wallet,
  ArrowRight,
  Sparkles,
  Ticket,
  AlertCircle,
} from 'lucide-react';
import { PREORDER_SLOTS } from '@/lib/mock-data';
import DigitalReceiptModal from './DigitalReceiptModal';
import { Order } from '@/types';

export default function CartDrawer() {
  const {
    cart,
    updateQuantity,
    totalItems,
    subtotal,
    discount,
    totalPrice,
    isPreOrder,
    setIsPreOrder,
    selectedSlot,
    setSelectedSlot,
    customTime,
    setCustomTime,
    orderNotes,
    setOrderNotes,
    paymentMethod,
    setPaymentMethod,
    applyPromoCode,
    appliedPromo,
    createOrder,
    isCartOpen,
    setIsCartOpen,
    currentUser,
  } = useCart();

  const { playPop } = useSpeech();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleApplyPromo = () => {
    playPop();
    setPromoError('');
    if (!promoInput) return;
    const success = applyPromoCode(promoInput);
    if (!success) {
      setPromoError('Kode promo tidak valid atau minimal belanja belum terpenuhi.');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Check balance if paying with Student Card
    if (paymentMethod === 'emoney' && currentUser && currentUser.balance < totalPrice) {
      alert(`Saldo Kartu Pelajar tidak cukup! Saldo Anda: Rp ${currentUser.balance.toLocaleString('id-ID')}, Total: Rp ${totalPrice.toLocaleString('id-ID')}`);
      return;
    }

    const firstStallId = cart[0].stallId;
    const order = createOrder(firstStallId, 'Stan Kantin PASTI78');
    if (order) {
      setCompletedOrder(order);
      setIsCartOpen(false);
      setIsReceiptOpen(true);
    }
  };

  return (
    <>
      <Dialog.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="radix-dialog-overlay" />
          <Dialog.Content className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white p-0 shadow-2xl z-50 flex flex-col focus:outline-none animate-slide-up sm:animate-none">
            
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-primary flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <Dialog.Title className="text-sm font-bold text-slate-900 font-heading">
                    Keranjang Belanja
                  </Dialog.Title>
                  <Dialog.Description className="text-[11px] text-slate-500">
                    {totalItems} item dipilih
                  </Dialog.Description>
                </div>
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

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5">
              {cart.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <h4 className="text-sm font-bold text-slate-700">Keranjang Masih Kosong</h4>
                  <p className="text-xs text-slate-400 mt-1">Pilih menu lezat di katalog untuk mulai memesan.</p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex flex-col divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                          <span className="text-xs font-extrabold text-primary">
                            Rp {item.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex items-center bg-slate-100 rounded-full p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded-full bg-white text-slate-800 flex items-center justify-center font-bold shadow-2xs hover:bg-slate-200"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-2xs hover:bg-primary-dark"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fitur 5: Sistem Pre-Order Switch & Slots */}
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="sticker-badge sticker-num-5" style={{ width: '20px', height: '20px', fontSize: '0.65rem' }}>5</span>
                        <span className="text-xs font-bold text-amber-900 font-heading">Sistem Pre-Order</span>
                      </div>
                      <Switch.Root
                        checked={isPreOrder}
                        onCheckedChange={(checked) => {
                          playPop();
                          setIsPreOrder(checked);
                        }}
                        className="w-9 h-5 bg-slate-300 rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer transition-colors"
                      >
                        <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[18px]" />
                      </Switch.Root>
                    </div>

                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Ambil pesanan pada jam tertentu tanpa antre (contoh: Jam Istirahat 1 / 2).
                    </p>

                    {isPreOrder && (
                      <div className="mt-3 flex flex-col gap-1.5 animate-fade-in">
                        {PREORDER_SLOTS.map((slot) => {
                          const isSelected = selectedSlot === slot.id;
                          return (
                            <div
                              key={slot.id}
                              onClick={() => {
                                playPop();
                                setSelectedSlot(slot.id);
                              }}
                              className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                                isSelected
                                  ? 'bg-white border-primary ring-1 ring-primary shadow-xs'
                                  : 'bg-white/60 border-amber-200 hover:bg-white'
                              }`}
                            >
                              <div>
                                <div className="font-bold text-slate-800">{slot.name}</div>
                                <div className="text-[10px] text-slate-500">⏰ {slot.time}</div>
                              </div>
                              <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                {slot.badge}
                              </span>
                            </div>
                          );
                        })}

                        {selectedSlot === 'slot-custom' && (
                          <div className="mt-1">
                            <label className="text-[10px] font-bold text-slate-600">Jam Pengambilan:</label>
                            <input
                              type="time"
                              value={customTime}
                              onChange={(e) => setCustomTime(e.target.value)}
                              className="w-full mt-1 p-2 bg-white border border-amber-200 rounded-lg text-xs"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Notes input */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      📝 Catatan Khusus untuk Stan
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Contoh: Sambal dipisah, es batu sedikit..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Fitur 6: Pembayaran Nontunai */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="sticker-badge sticker-num-6" style={{ width: '20px', height: '20px', fontSize: '0.65rem' }}>6</span>
                      <span className="text-xs font-bold text-slate-900 font-heading">Metode Pembayaran Nontunai</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 mt-1">
                      {/* Kartu Pelajar */}
                      <button
                        onClick={() => {
                          playPop();
                          setPaymentMethod('emoney');
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          paymentMethod === 'emoney'
                            ? 'bg-emerald-50/70 border-emerald-500 ring-1 ring-emerald-500 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800">Kartu Pelajar (E-Money)</div>
                            <div className="text-[10px] text-emerald-700 font-semibold">
                              Saldo: Rp {currentUser?.balance.toLocaleString('id-ID') || 0}
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* QRIS */}
                      <button
                        onClick={() => {
                          playPop();
                          setPaymentMethod('qris');
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          paymentMethod === 'qris'
                            ? 'bg-orange-50/70 border-primary ring-1 ring-primary shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-orange-100 text-primary flex items-center justify-center">
                            <QrCode className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800">QRIS Kantin Digital</div>
                            <div className="text-[10px] text-slate-500">Scan BCA, GoPay, OVO, DANA</div>
                          </div>
                        </div>
                      </button>

                      {/* E-Wallet */}
                      <button
                        onClick={() => {
                          playPop();
                          setPaymentMethod('ewallet');
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          paymentMethod === 'ewallet'
                            ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-500 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-100/70'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                            <Wallet className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800">E-Wallet Instan</div>
                            <div className="text-[10px] text-slate-500">GoPay, DANA, ShopeePay</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="Kode Promo (PASTI78)"
                        className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                      >
                        Gunakan
                      </button>
                    </div>
                    {promoError && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {promoError}
                      </span>
                    )}
                    {appliedPromo && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Voucher {appliedPromo} berhasil digunakan!
                      </span>
                    )}
                  </div>

                  {/* Fitur 3: Kalkulasi Total Belanja Otomatis */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs flex flex-col gap-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal Menu:</span>
                      <strong className="text-slate-800">Rp {subtotal.toLocaleString('id-ID')}</strong>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Potongan Diskon:</span>
                        <span>- Rp {discount.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>Biaya Layanan:</span>
                      <strong className="text-emerald-600 font-bold">GRATIS</strong>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Pembayaran:</span>
                      <span className="text-primary font-heading">
                        Rp {totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Checkout Button */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-white">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-orange-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span>Bayar Sekarang (Rp {totalPrice.toLocaleString('id-ID')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Digital Receipt Modal on Checkout */}
      {completedOrder && (
        <DigitalReceiptModal
          isOpen={isReceiptOpen}
          onOpenChange={setIsReceiptOpen}
          order={completedOrder}
        />
      )}
    </>
  );
}
