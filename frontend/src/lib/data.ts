import { Item } from './types'; // Asumo que tus tipos están en @/lib/types

export function filterItems(
  items: Item[], // <-- ¡Este es el cambio clave!
  searchTerm: string, 
  filterType: 'all' | 'product' | 'event'
): Item[] {
  
  // Si los 'items' son null o undefined (ej: mientras carga),
  // devolvemos un array vacío para evitar errores.
  if (!items) {
    return [];
  }

  // Filtramos el array que recibimos
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });
}
