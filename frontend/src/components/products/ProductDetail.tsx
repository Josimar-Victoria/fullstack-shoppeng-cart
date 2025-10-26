"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useApi } from '@/hook/useApi';
import { ProductDetailResponse } from '@/types/api';
import ProductHeader from './ProductHeader';
import ProductContent from './ProductContent';
import ProductError from './ProductError';
import ProductNotFound from './ProductNotFound';
import LoadingState from '../LoadingState';

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const id = params.id as string;
    const { data, isLoading, error, request } = useApi<ProductDetailResponse>();

    // Cargar datos del producto
    useEffect(() => {
        if (id) {
            request({
                method: 'GET',
                url: `/api/products/${id}`
            });
        }
    }, [id, request]);

    const item = data?.product;

    // Manejar añadir al carrito
    const handleAddToCart = () => {
        if (item) {
            addToCart(item, quantity);
            router.push('/carrito');
        }
    };

    // Estados de carga y error
    if (isLoading) return <LoadingState />;
    if (error) return <ProductError error={error} onBack={() => router.push('/')} />;
    if (!item) return <ProductNotFound onBack={() => router.push('/')} />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <ProductHeader onBack={() => router.back()} />
            <ProductContent
                item={item}
                quantity={quantity}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
}