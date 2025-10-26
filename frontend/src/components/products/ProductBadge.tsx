"use client";
import React from 'react';

interface ProductBadgeProps {
    type: 'product' | 'event';
}

export default function ProductBadge({ type }: ProductBadgeProps) {
    const isProduct = type === 'product';

    return (
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${isProduct
                ? 'bg-blue-100 text-blue-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
            {isProduct ? 'Producto' : 'Evento'}
        </span>
    );
}