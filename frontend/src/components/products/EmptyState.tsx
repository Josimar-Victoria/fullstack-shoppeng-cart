"use client";
import React from 'react';
import { Package } from 'lucide-react';

export default function EmptyState() {
    return (
        <div className="text-center py-20 flex flex-col items-center gap-4">
            <Package className="w-12 h-12 text-gray-400" />
            <p className="text-xl font-semibold text-gray-700">No tienes productos</p>
            <p className="text-gray-500">
                ¡Empieza a vender! Haz clic en Crear Nuevo Producto para añadir tu primer item.
            </p>
        </div>
    );
}