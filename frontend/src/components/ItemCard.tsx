"use client"
import React from 'react';
import Link from 'next/link';
import { Plus, Star } from 'lucide-react';
import { Item } from '@/lib/types';
import { useCart } from '@/lib/cart-context';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const { addToCart, getCartItemQuantity } = useCart();
  const cartQuantity = getCartItemQuantity(item.id);

  return (
    <Link href={`/detalle/${item.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full">
        {/* Imagen y Badge */}
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-6xl">
            {item.image}
          </div>
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
            item.type === 'product'
              ? 'bg-blue-500 text-white'
              : 'bg-purple-500 text-white'
          }`}>
            {item.type === 'product' ? 'Producto' : 'Evento'}
          </span>
        </div>
        
        {/* Contenido */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {item.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{item.rating}</span>
            <span className="text-xs text-gray-500">
              
              (250 reseñas)
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-blue-600">
              ${item.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              Stock: {item.stock}
            </span>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(item);
            }}
            disabled={cartQuantity >= item.stock}
            className={`w-full py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${
              cartQuantity > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-yellow-400 text-blue-900 hover:bg-yellow-500'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            {cartQuantity > 0 ? (
              <>✓ Añadido ({cartQuantity})</>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Añadir
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}