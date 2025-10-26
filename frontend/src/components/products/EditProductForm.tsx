"use client";
import React, { useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useApi } from '@/hook/useApi';
import { ProductDetailResponse, UpdateProductResponse } from '@/types/api';
import FormHeader from './FormHeader';
import ProductForm from './ProductForm';
import { useProductForm } from '@/hook/useProductForm';
import LoadingState from '../LoadingState';
import ErrorState from '../ErrorState';
export default function EditProductForm() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    // Hooks para API
    const {
        data: initialData,
        isLoading: isLoadingData,
        error: loadError,
        request: loadRequest
    } = useApi<ProductDetailResponse>();

    const {
        isLoading: isSaving,
        error: saveError,
        request: saveRequest
    } = useApi<UpdateProductResponse>();

    // Hook para manejo del formulario
    const {
        formData,
        formError,
        updateField,
        setFormError,
        setFormData
    } = useProductForm();

    // Función para cargar datos - useCallback para evitar recreación
    const loadProductData = useCallback(async () => {
        if (id) {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.push('/');
                return;
            }
            await loadRequest({
                method: 'GET',
                url: `/api/products/${id}`,
            });
        }
    }, [id, loadRequest, router]);

    // Cargar datos del producto - SOLO cuando cambie el id
    useEffect(() => {
        loadProductData();
    }, [loadProductData]); // Solo depende de loadProductData

    // Llenar formulario con datos cargados - SOLO cuando cambien initialData
    useEffect(() => {
        if (initialData?.product) {
            const product = initialData.product;
            setFormData({
                name: product.name,
                price: product.price.toString(),
                type: product.type,
                stock: product.stock.toString(),
                image: product.image,
                category: product.category,
                description: product.description,
                rating: product.rating.toString()
            });
        }
    }, [initialData, setFormData]); // Solo depende de initialData y setFormData

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Validaciones
        if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.description) {
            setFormError('Por favor, completa todos los campos obligatorios.');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            setFormError('No estás autenticado. Por favor, inicia sesión de nuevo.');
            return;
        }

        // Llamada a la API para actualizar
        const { success, error: apiError } = await saveRequest({
            method: 'PUT',
            url: `/api/products/${id}`,
            token: token,
            body: {
                name: formData.name,
                price: Number(formData.price),
                type: formData.type,
                stock: Number(formData.stock),
                image: formData.image,
                category: formData.category,
                description: formData.description,
                rating: Number(formData.rating)
            }
        });

        if (success) {
            router.push('/mis-productos');
        } else {
            setFormError(apiError || 'Ocurrió un error al guardar los cambios.');
        }
    };

    // Estados de carga y error
    if (isLoadingData) {
        return <LoadingState />;
    }

    if (loadError) {
        return <ErrorState error={loadError} />;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <FormHeader
                title="Editar Producto"
                description="Modifica los detalles de tu item."
            />

            <ProductForm
                formData={formData}
                isLoading={isSaving}
                formError={formError}
                apiError={saveError}
                onUpdateField={updateField}
                onSubmit={handleSubmit}
                submitButtonText="Guardar Cambios"
                submitButtonIcon="Save"
                buttonColor="from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
            />
        </div>
    );
}