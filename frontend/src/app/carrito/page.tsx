"use client"
// app/carrito/page.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const router = useRouter();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Botón Volver */}
      <button
        onClick={() => router.push('/')}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        Continuar comprando
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mi Carrito</h2>

      {cart.length === 0 ? (
        // Carrito Vacío
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <p className="text-xl text-gray-600 mb-6">Tu carrito está vacío</p>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition cursor-pointer"
          >
            Explorar productos
          </button>
        </div>
      ) : (
        // Carrito con Items
        <div className="space-y-4">
          {/* Lista de Items */}
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4"
            >
              {/* Imagen */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                {item.image}
              </div>

              {/* Información del Item */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${
                  item.type === 'product'
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
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold w-10 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                  title="Eliminar del carrito"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Resumen del Pedido */}
          <div className="sticky bottom-4 bg-white border-4 border-blue-600 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Resumen del Pedido
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Total de ítems:</span>
                <span className="font-bold">{getTotalItems()} unidades</span>
              </div>
              
              <div className="border-t border-gray-200 my-3"></div>
              
              <div className="flex justify-between text-2xl">
                <span className="font-bold text-gray-800">Total a pagar:</span>
                <span className="font-bold text-blue-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            <button 
              onClick={() => alert('¡Funcionalidad de pago en desarrollo!')}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold text-xl rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}