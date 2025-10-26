"use client";

import React from 'react';
import Link from 'next/link';
import { Plus, Star, Edit, Trash2 } from 'lucide-react';
import { Item } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import ProductImage from './products/ProductImage';

interface ItemCardProps {
  item: Item;
  showActions?: boolean;
  onEdit?: (item: Item) => void;
  onDelete?: (item: Item) => void;
}

export default function ItemCard({
  item,
  showActions = false,
  onEdit,
  onDelete
}: ItemCardProps) {
  const { addToCart, getCartItemQuantity } = useCart();
  const cartQuantity = getCartItemQuantity(item.id);

  // Función para manejar el click en editar
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(item);
    }
  };

  // Función para manejar el click en eliminar
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(item);
    }
  };

  return (
    <Link href={`/detalle/${item.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full relative">

        {/* Botones de acción flotantes (solo en Mis Productos) */}
        {showActions && (
          <div className="absolute top-3 right-3 flex gap-2 z-20">
            {/* Botón Editar */}
            <button
              onClick={handleEdit}
              className="p-2 bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white rounded-full shadow-lg transition-all transform hover:scale-110"
              title="Editar producto"
              aria-label={`Editar ${item.name}`}
            >
              <Edit className="w-4 h-4" />
            </button>

            {/* Botón Eliminar */}
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-full shadow-lg transition-all transform hover:scale-110"
              title="Eliminar producto"
              aria-label={`Eliminar ${item.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Imagen y Badge */}
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
            <ProductImage image={item.image} name={item.name} />
          </div>
          <span className={`absolute top-3 ${showActions ? 'left-3' : 'right-3'} px-3 py-1 rounded-full text-xs font-bold ${item.type === 'product'
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

          {/* Botón de añadir al carrito (solo si NO estamos en modo "mis productos") */}
          {!showActions && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(item);
              }}
              disabled={cartQuantity >= item.stock}
              className={`w-full py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2 ${cartQuantity > 0
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
          )}

          {/* Mensaje informativo en modo "mis productos" */}
          {showActions && (
            <div className="w-full py-2 text-center text-sm text-gray-500 border border-gray-200 rounded-lg">
              📦 Tu producto
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}