"use client";
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Item } from '@/lib/types';
import QuantitySelector from './QuantitySelector';

interface ProductPurchaseProps {
    item: Item;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: () => void;
}

export default function ProductPurchase({
    item,
    quantity,
    onQuantityChange,
    onAddToCart
}: ProductPurchaseProps) {
    return (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="text-4xl font-bold text-blue-600 mb-4">
                ${item.price.toFixed(2)}
            </div>

            <QuantitySelector
                quantity={quantity}
                maxQuantity={item.stock}
                onQuantityChange={onQuantityChange}
            />

            <button
                onClick={onAddToCart}
                disabled={item.stock === 0}
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
                <ShoppingCart className="w-5 h-5" />
                Añadir al Carrito
            </button>
        </div>
    );
}