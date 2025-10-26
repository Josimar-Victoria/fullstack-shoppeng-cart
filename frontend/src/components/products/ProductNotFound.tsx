"use client";
import React from 'react';

interface ProductNotFoundProps {
    onBack: () => void;
}

export default function ProductNotFound({ onBack }: ProductNotFoundProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Producto no encontrado
                </h2>
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