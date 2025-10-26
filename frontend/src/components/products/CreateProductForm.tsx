"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hook/useApi';
import { CreateProductResponse } from '@/types/api';
import FormHeader from './FormHeader';
import ProductForm from './ProductForm';
import { useProductForm } from '@/hook/useProductForm';

export default function CreateProductForm() {
    const router = useRouter();
    const { isLoading, error, request } = useApi<CreateProductResponse>();

    // Hook personalizado para manejar el estado del formulario
    const {
        formData,
        formError,
        updateField,
        setFormError,
        resetForm
    } = useProductForm();

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Validaciones básicas
        if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.description) {
            setFormError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            setFormError('No estás autenticado. Por favor, inicia sesión de nuevo.');
            return;
        }

        // Llamada a la API
        const { success, error: apiError } = await request({
            method: 'POST',
            url: '/api/products',
            token: token,
            body: {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                rating: Number(formData.rating)
            }
        });

        if (success) {
            router.push('/mis-productos');
        } else {
            setFormError(apiError || 'Ocurrió un error al crear el producto.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <FormHeader />

            <ProductForm
                formData={formData}
                isLoading={isLoading}
                formError={formError}
                apiError={error}
                onUpdateField={updateField}
                onSubmit={handleSubmit}
            />
        </div>
    );
}