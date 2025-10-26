"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import CartItemList from '@/components/cart/CartItemList';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import BackButton from '@/components/ui/BackButton';

export default function CartPage() {
  const router = useRouter();
  const { cart, getTotalItems, getTotalPrice } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <BackButton
        onClick={() => router.push('/')}
        text="Continuar comprando"
      />

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mi Carrito</h2>

      {cart.length === 0 ? (
        <EmptyCart onExploreProducts={() => router.push('/')} />
      ) : (
        <div className="space-y-4">
          <CartItemList />
          <CartSummary
            totalItems={getTotalItems()}
            totalPrice={getTotalPrice()}
          />
        </div>
      )}
    </div>
  );
}