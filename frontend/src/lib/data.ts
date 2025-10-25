import { Item } from './types';

/**
 * Datos de ejemplo de productos y eventos
 */
export const ITEMS_DATA: Item[] = [
  { 
    id: 1, 
    name: 'Laptop Gaming Pro', 
    price: 1299.99, 
    type: 'product', 
    stock: 5, 
    image: '💻', 
    category: 'Tecnología',
    description: 'Laptop de alto rendimiento con procesador Intel Core i9, 32GB RAM, RTX 4080 y pantalla 144Hz. Perfecta para gaming y trabajo profesional. Incluye sistema de refrigeración avanzado y teclado RGB personalizable.',
    rating: 4.8
  },
  { 
    id: 2, 
    name: 'Concierto Rock 2025', 
    price: 89.99, 
    type: 'event', 
    stock: 150, 
    image: '🎸', 
    category: 'Eventos',
    description: 'El evento musical del año. Las mejores bandas de rock en vivo. Incluye acceso VIP y meet & greet con los artistas. Fecha: 15 de marzo 2025. Lugar: Estadio Nacional.',
    rating: 4.9
  },
  { 
    id: 3, 
    name: 'Auriculares Bluetooth', 
    price: 79.99, 
    type: 'product', 
    stock: 12, 
    image: '🎧', 
    category: 'Tecnología',
    description: 'Auriculares inalámbricos con cancelación de ruido activa, 30 horas de batería y sonido Hi-Fi premium. Conectividad Bluetooth 5.0 y carga rápida USB-C.',
    rating: 4.6
  },
  { 
    id: 4, 
    name: 'Festival Gastronómico', 
    price: 45.00, 
    type: 'event', 
    stock: 200, 
    image: '🍽️', 
    category: 'Eventos',
    description: 'Degusta los mejores platos de chefs reconocidos internacionalmente. Incluye bebidas y acceso a talleres culinarios. Fecha: 20 de abril 2025. Más de 50 stands gastronómicos.',
    rating: 4.7
  },
  { 
    id: 5, 
    name: 'Smartwatch Ultra', 
    price: 399.99, 
    type: 'product', 
    stock: 8, 
    image: '⌚', 
    category: 'Tecnología',
    description: 'Reloj inteligente con GPS, monitor cardíaco, resistente al agua hasta 50m y batería de 7 días. Compatible con iOS y Android. Incluye más de 100 modos deportivos.',
    rating: 4.5
  },
  { 
    id: 6, 
    name: 'Curso Marketing Digital', 
    price: 149.99, 
    type: 'event', 
    stock: 50, 
    image: '📚', 
    category: 'Eventos',
    description: 'Curso completo de marketing digital con certificación internacional. Aprende SEO, SEM, Social Media y Analytics. 8 semanas de duración. Inicio: 1 de mayo 2025.',
    rating: 4.9
  },
  { 
    id: 7, 
    name: 'Cámara Profesional 4K', 
    price: 899.99, 
    type: 'product', 
    stock: 6, 
    image: '📷', 
    category: 'Tecnología',
    description: 'Cámara mirrorless con sensor full-frame, grabación 4K a 60fps y estabilización de imagen integrada. Incluye lente 24-70mm y maleta de transporte.',
    rating: 4.7
  },
  { 
    id: 8, 
    name: 'Maratón Ciudad 2025', 
    price: 35.00, 
    type: 'event', 
    stock: 500, 
    image: '🏃', 
    category: 'Eventos',
    description: 'Participa en el maratón más importante de la ciudad. Distancias: 5K, 10K y 21K. Incluye kit deportivo, medalla y chip de tiempo. Fecha: 10 de junio 2025.',
    rating: 4.8
  },
];

/**
 * Busca un item por su ID
 */
export function getItemById(id: number): Item | undefined {
  return ITEMS_DATA.find(item => item.id === id);
}

/**
 * Filtra items por búsqueda y tipo
 */
export function filterItems(
  searchTerm: string, 
  filterType: 'all' | 'product' | 'event'
): Item[] {
  return ITEMS_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });
}