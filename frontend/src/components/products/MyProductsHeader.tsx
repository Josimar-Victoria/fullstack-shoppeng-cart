"use client";
import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function MyProductsHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Mis Productos</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Aquí puedes gestionar todos los items que has puesto a la venta.
                </p>
            </div>
            <Link
                href="/crear-productos"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
            >
                <Plus className="w-5 h-5" />
                Crear Nuevo Producto
            </Link>
        </div>
    );
}