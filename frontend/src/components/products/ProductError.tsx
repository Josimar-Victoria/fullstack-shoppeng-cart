"use client";
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ProductErrorProps {
    error: string;
    onBack: () => void;
}

export default function ProductError({ error, onBack }: ProductErrorProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center bg-red-50 p-10 rounded-lg">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Error al cargar el producto
                </h2>
                <p className="text-red-600 mb-6">{error}</p>
                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition"
                >
                    Volver al catálogo
                </button>
            </div>
        </div>
    );
}