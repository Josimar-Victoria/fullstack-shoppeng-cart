"use client";
import React from 'react';
import { useCart } from '@/lib/cart-context';
import CartItem from './CartItem';

export default function CartItemList() {
    const { cart, updateQuantity, removeFromCart } = useCart();

    return (
        <div className="space-y-4">
            {cart.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                />
            ))}
        </div>
    );
}