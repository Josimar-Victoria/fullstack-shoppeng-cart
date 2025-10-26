"use client";
import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    quantity: number;
    maxQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
    quantity,
    maxQuantity,
    onQuantityChange
}: QuantitySelectorProps) {
    const handleDecrease = () => {
        onQuantityChange(Math.max(1, quantity - 1));
    };

    const handleIncrease = () => {
        onQuantityChange(Math.min(maxQuantity, quantity + 1));
    };

    return (
        <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-700 font-semibold">Cantidad:</span>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleDecrease}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
                >
                    <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold w-12 text-center">
                    {quantity}
                </span>
                <button
                    onClick={handleIncrease}
                    disabled={quantity >= maxQuantity}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition disabled:bg-gray-300"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}