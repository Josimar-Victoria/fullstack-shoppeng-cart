"use client"
// app/page.tsx
import React from 'react';
import { Filter, Package, Calendar } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { filterItems } from '@/lib/data';
import ItemCard from '@/components/ItemCard';

export default function CatalogPage() {
  const { searchTerm, filterType, setFilterType } = useCart();
  
  const filteredItems = filterItems(searchTerm, filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-full transition ${
            filterType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilterType('product')}
          className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
            filterType === 'product'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Package className="w-4 h-4" />
          Productos
        </button>
        <button
          onClick={() => setFilterType('event')}
          className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
            filterType === 'event'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Eventos
        </button>
      </div>

      {/* Resultados */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No se encontraron resultados para {searchTerm}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}