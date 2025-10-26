"use client";
import React from 'react';
import { Item } from '@/lib/types';
import ItemCard from '@/components/ItemCard';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
import ProductsGrid from './ProductsGrid';
import EmptyState from './EmptyState';


interface MyProductsContentProps {
    products: Item[];
    isLoading: boolean;
    error: string | null;
    onEdit: (product: Item) => void;
    onDelete: (product: Item) => void;
}

export default function MyProductsContent({
    products,
    isLoading,
    error,
    onEdit,
    onDelete
}: MyProductsContentProps) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 min-h-[300px]">
            {isLoading && <LoadingState />}

            {error && !isLoading && <ErrorState error={error} />}

            {!isLoading && !error && products.length === 0 && <EmptyState />}

            {!isLoading && !error && products.length > 0 && (
                <ProductsGrid
                    products={products}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
}