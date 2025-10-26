"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hook/useApi';
import { Item } from '@/lib/types';
import { MyProductsResponse, DeleteResponse } from '@/types/api';
import MyProductsHeader from './MyProductsHeader';
import MyProductsContent from './MyProductsContent';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import DeleteErrorToast from './DeleteErrorToast';

export default function MyProducts() {
    const { data, isLoading, error, request } = useApi<MyProductsResponse>();
    const { isLoading: isDeleting, error: deleteError, request: deleteRequest } = useApi<DeleteResponse>();

    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Item | null>(null);

    const products = data?.products || [];

    // Cargar productos al montar
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
            router.push('/');
            return;
        }

        request({
            method: 'GET',
            url: '/api/products/user/my-products',
            token: storedToken
        });
    }, [router, request]);

    // Manejar edición
    const handleEdit = (product: Item) => {
        router.push(`/editar-producto/${product.id}`);
    };

    // Manejar eliminación
    const handleDelete = (product: Item) => {
        setProductToDelete(product);
        setIsModalOpen(true);
    };

    // Cerrar modal
    const handleCloseModal = () => {
        if (!isDeleting) {
            setIsModalOpen(false);
            setProductToDelete(null);
        }
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/');
            return;
        }

        try {
            await deleteRequest({
                method: 'DELETE',
                url: `/api/products/${productToDelete.id}`,
                token: token
            });

            // Recargar lista
            request({
                method: 'GET',
                url: '/api/products/user/my-products',
                token: token
            });

            setIsModalOpen(false);
            setProductToDelete(null);

        } catch (err) {
            console.error('❌ Error al eliminar:', err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <MyProductsHeader />

            <MyProductsContent
                products={products}
                isLoading={isLoading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Modal de Confirmación */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title="Eliminar Producto"
                message={`¿Estás seguro de que deseas eliminar "${productToDelete?.name}"? Esta acción no se puede deshacer.`}
            />

            {/* Toast de error */}
            {deleteError && <DeleteErrorToast error={deleteError} />}
        </div>
    );
}