"use client"
// app/detalle/[id]/page.tsx
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Minus, Star, ShoppingCart } from 'lucide-react';
import { getItemById } from '@/lib/data';
import { useCart } from '@/lib/cart-context';

export default function DetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const itemId = typeof params.id === 'string' ? parseInt(params.id) : 0;
    const item = getItemById(itemId);

    if (!item) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Producto no encontrado
                    </h2>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition"
                    >
                        Volver al catálogo
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(item, quantity);
        router.push('/carrito');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Breadcrumb / Botón Volver */}
            <button
                onClick={() => router.back()}
                className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
            >
                <ArrowLeft className="w-5 h-5" />
                Volver
            </button>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Imagen */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 flex items-center justify-center">
                        <div className="text-9xl">{item.image}</div>
                    </div>

                    {/* Información del Producto */}
                    <div className="p-6">
                        {/* Badge de Tipo */}
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${item.type === 'product'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                            {item.type === 'product' ? 'Producto' : 'Evento'}
                        </span>

                        {/* Nombre */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">
                            {item.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg font-semibold">{item.rating}</span>
                            </div>
                            <span className="text-gray-500">
                                ({Math.floor(Math.random() * 500) + 100} reseñas)
                            </span>
                        </div>

                        {/* Descripción */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {item.description}
                        </p>

                        {/* Stock */}
                        <div className={`mb-6 p-4 rounded-lg ${item.stock > 10
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-orange-50 border border-orange-200'
                            }`}>
                            <span className={`font-semibold ${item.stock > 10 ? 'text-green-700' : 'text-orange-700'
                                }`}>
                                {item.stock > 0
                                    ? `✓ Disponible: ${item.stock} unidades`
                                    : '✗ ¡Agotado!'}
                            </span>
                        </div>

                        <div className="border-t border-gray-200 my-6"></div>

                        {/* Área de Compra */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                            {/* Precio */}
                            <div className="text-4xl font-bold text-blue-600 mb-4">
                                ${item.price.toFixed(2)}
                            </div>

                            {/* Selector de Cantidad */}
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-gray-700 font-semibold">Cantidad:</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="text-2xl font-bold w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(Math.min(item.stock, quantity + 1))}
                                        disabled={quantity >= item.stock}
                                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition disabled:bg-gray-300"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Botón Añadir al Carrito */}
                            <button
                                onClick={handleAddToCart}
                                disabled={item.stock === 0}
                                className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg rounded-full transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}