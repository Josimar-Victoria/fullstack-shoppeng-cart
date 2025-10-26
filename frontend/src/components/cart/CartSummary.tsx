"use client";
import React from 'react';

interface CartSummaryProps {
    totalItems: number;
    totalPrice: number;
}

export default function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
    const handleCheckout = () => {
        alert('¡Funcionalidad de pago en desarrollo!');
    };

    return (
        <div className="sticky bottom-4 bg-white border-4 border-blue-600 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                Resumen del Pedido
            </h3>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Total de ítems:</span>
                    <span className="font-bold">{totalItems} unidades</span>
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                <div className="flex justify-between text-2xl">
                    <span className="font-bold text-gray-800">Total a pagar:</span>
                    <span className="font-bold text-blue-600">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold text-xl rounded-full transition-all shadow-lg hover:shadow-xl"
            >
                Finalizar Compra
            </button>
        </div>
    );
}