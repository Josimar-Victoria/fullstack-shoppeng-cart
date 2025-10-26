"use client";
import React from 'react';
import { Item } from '@/lib/types';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductPurchase from './ProductPurchase';

interface ProductContentProps {
    item: Item;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: () => void;
}

export default function ProductContent({
    item,
    quantity,
    onQuantityChange,
    onAddToCart
}: ProductContentProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
                <ProductImage image={item.image} name={item.name} />
                <div className="p-6">
                    <ProductInfo item={item} />
                    <div className="border-t border-gray-200 my-6"></div>
                    <ProductPurchase
                        item={item}
                        quantity={quantity}
                        onQuantityChange={onQuantityChange}
                        onAddToCart={onAddToCart}
                    />
                </div>
            </div>
        </div>
    );
}