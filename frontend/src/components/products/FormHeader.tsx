"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface FormHeaderProps {
    title?: string;
    description?: string;
}

export default function FormHeader({
    title = "Crear Nuevo Producto",
    description = "Completa los detalles de tu nuevo item."
}: FormHeaderProps) {
    return (
        <div className="mb-8">
            <Link
                href="/mis-productos"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-semibold"
            >
                <ArrowLeft className="w-5 h-5" />
                Volver a Mis Productos
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mt-4">
                {title}
            </h1>
            <p className="text-lg text-gray-600">
                {description}
            </p>
        </div>
    );
}