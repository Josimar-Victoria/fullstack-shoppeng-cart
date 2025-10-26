"use client";
import React from 'react';

interface ProductStockProps {
    stock: number;
}

export default function ProductStock({ stock }: ProductStockProps) {
    const getStockConfig = () => {
        if (stock > 10) {
            return {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-700',
                message: `✓ Disponible: ${stock} unidades`
            };
        } else if (stock > 0) {
            return {
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                text: 'text-orange-700',
                message: `✓ Disponible: ${stock} unidades`
            };
        } else {
            return {
                bg: 'bg-red-50',
                border: 'border-red-200',
                text: 'text-red-700',
                message: '✗ ¡Agotado!'
            };
        }
    };

    const config = getStockConfig();

    return (
        <div className={`mb-6 p-4 rounded-lg ${config.bg} border ${config.border}`}>
            <span className={`font-semibold ${config.text}`}>
                {config.message}
            </span>
        </div>
    );
}