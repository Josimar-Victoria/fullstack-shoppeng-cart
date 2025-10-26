"use client";
import React from 'react';
import { Item } from '@/lib/types';
import ItemCard from '@/components/ItemCard';

interface ProductsGridProps {
    products: Item[];
    onEdit: (product: Item) => void;
    onDelete: (product: Item) => void;
}

export default function ProductsGrid({
    products,
    onEdit,
    onDelete
}: ProductsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(item => (
                <ItemCard
                    key={item.id}
                    item={item}
                    showActions={true}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}