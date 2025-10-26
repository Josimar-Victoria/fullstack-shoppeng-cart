"use client";
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface EmptyCartProps {
    onExploreProducts: () => void;
}

export default function EmptyCart({ onExploreProducts }: EmptyCartProps) {
    return (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-600 mb-6">Tu carrito está vacío</p>
            <button
                onClick={onExploreProducts}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition cursor-pointer"
            >
                Explorar productos
            </button>
        </div>
    );
}