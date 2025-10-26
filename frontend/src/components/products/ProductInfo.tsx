"use client";
import React from 'react';
import { Star } from 'lucide-react';
import { Item } from '@/lib/types';
import ProductBadge from './ProductBadge';
import ProductStock from './ProductStock';

interface ProductInfoProps {
    item: Item;
}

export default function ProductInfo({ item }: ProductInfoProps) {
    return (
        <>
            <ProductBadge type={item.type} />

            <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {item.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">{item.rating}</span>
                </div>
                <span className="text-gray-500">
                    (22 reseñas)
                </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
                {item.description}
            </p>

            <ProductStock stock={item.stock} />
        </>
    );
}