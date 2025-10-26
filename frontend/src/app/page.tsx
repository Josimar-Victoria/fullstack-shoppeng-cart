"use client"
// app/page.tsx
import React, { useEffect } from 'react'; // Importamos useEffect
import { Filter, Package, Calendar, Loader2 } from 'lucide-react'; // Importamos Loader2
import { useCart } from '@/lib/cart-context';
import { filterItems } from '@/lib/data';
import ItemCard from '@/components/ItemCard';

// --- 1. Importamos el hook y los tipos ---
import { Item } from '@/lib/types'; // Asumo que tus tipos están en @/lib/types
import { useApi } from '@/hook/useApi';

// --- 2. Definimos la respuesta de la API de productos ---
// (Basado en la respuesta de tu backend)
interface ProductsApiResponse {
  message: string;
  products: Item[];
}

export default function CatalogPage() {
  const { searchTerm, filterType, setFilterType } = useCart();
  
  // --- 3. Inicializamos el hook ---
  // 'data' será del tipo 'ProductsApiResponse' (o null)
  const { data, isLoading, error, request } = useApi<ProductsApiResponse>();

  console.log(data, 'data+++')
  // --- 4. Ejecutamos la petición al cargar el componente ---
  useEffect(() => {
    // Llamamos a la función 'request' que nos dio el hook
    request({
      method: 'GET',
      url: '/api/products' // Esta es la API de Next.js
    });
    // 'request' está memoizada con useCallback, es una dependencia estable.
  }, [request]); 

  // --- 5. Obtenemos los productos de la respuesta ---
  // 'data' es el objeto { message, products }.
  // Si 'data' es null (al inicio), usamos un array vacío.
  const products = data?.products || [];

  console.log(products, 'products +++++++')
  // --- 6. Pasamos los productos (de la API) a la función de filtro ---
  const filteredItems = filterItems(products, searchTerm, filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Filtros (Sin cambios) */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 cursor-pointer py-2 rounded-full transition ${
            filterType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilterType('product')}
          className={`px-4 cursor-pointer py-2 rounded-full transition flex items-center gap-2 ${
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
          className={`px-4 cursor-pointer py-2 rounded-full transition flex items-center gap-2 ${
            filterType === 'event'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Eventos
        </button>
      </div>

      {/* A. Estado de Carga */}
      {isLoading && (
        <div className="text-center py-12 flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <p className="text-xl text-gray-600">
            Cargando productos...
          </p>
        </div>
      )}

      {/* B. Estado de Error */}
      {error && !isLoading && (
        <div className="text-center py-12 bg-red-50 text-red-700 p-6 rounded-lg">
          <p className="text-xl font-bold">¡Oh no! Ocurrió un error</p>
          <p className="text-gray-700 mt-2">{error}</p>
        </div>
      )}
      
      {/* C. Estado de Éxito (Resultados) */}
      {!isLoading && !error && (
        <>
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                {/* Mensaje inteligente:
                  - Si hay productos pero el filtro no coincide = "No se encontraron"
                  - Si no hay productos en la BD = "Aún no hay productos"
                */}
                {products.length > 0
                  ? `No se encontraron resultados para "${searchTerm}"`
                  : 'Aún no hay productos disponibles.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
