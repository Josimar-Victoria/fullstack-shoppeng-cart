"use client";
import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import ProductImage from '../products/ProductImage';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4">
            Imagen
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                <ProductImage image={item.image} name={item.name} />
            </div>

            {/* Información del Item */}
            <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${item.type === 'product'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                    }`}>
                    {item.type === 'product' ? 'Producto' : 'Evento'}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                    ${item.price.toFixed(2)} c/u
                </p>
            </div>

            {/* Controles de Cantidad */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
                >
                    <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold w-10 text-center">
                    {item.quantity}
                </span>
                <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {/* Precio Total y Eliminar */}
            <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-blue-600">
                    ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                    title="Eliminar del carrito"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}