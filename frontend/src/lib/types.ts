/**
 * Tipo de item: producto o evento
 */
export type ItemType = 'product' | 'event';

/**
 * Estructura de un item en la tienda
 */
export interface Item {
  id: number;
  name: string;
  price: number;
  type: ItemType;
  stock: number;
  image: string;
  category: string;
  description: string;
  rating: number;
}

/**
 * Item en el carrito (incluye cantidad)
 */
export interface CartItem extends Item {
  quantity: number;
}

/**
 * Tipos de filtro disponibles
 */
export type FilterType = 'all' | 'product' | 'event';