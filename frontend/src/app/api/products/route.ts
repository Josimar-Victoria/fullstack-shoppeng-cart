import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

/**
 * GET /api/products - Ver todos los productos (Público)
 * Esta ruta es pública, no requiere autenticación.
 */
export async function GET(request: Request) {
  try {
    // 1. Hacemos fetch al backend real.
    // 'next: { revalidate: 60 }' activa el cacheo de Next.js (ISR).
    // Guardará esta respuesta por 60 segundos, mejorando el rendimiento.
    const apiResponse = await fetch(`${BACKEND_URL}/products`, {
      next: { revalidate: 60 },
    });

    // 2. Parseamos la data (un array de productos)
    const data = await apiResponse.json();

    // 3. Manejo de errores (si el backend falla)
    if (!apiResponse.ok) {
      return NextResponse.json(data, { status: apiResponse.status });
    }

    // 4. Devolvemos los productos al frontend
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { message: 'Error interno del servidor (Next.js)' }, { status: 500 }
    );
  }
}

/**
 * POST /api/products - Crear un nuevo producto (Protegido)
 * Esta ruta requiere un token de autorización.
 */
export async function POST(request: Request) {
  try {
    // 1. ¡CAMBIO CLAVE! Leer el header 'Authorization'.
    // 'request.headers' nos da acceso a todos los headers que envió el frontend.
    // Buscamos el header 'Authorization', que debería contener "Bearer tu_token_jwt".
    const authorizationHeader = request.headers.get('Authorization');

    // 2. Validar que el token exista.
    // Si el frontend no envió el header, rechazamos la petición.
    if (!authorizationHeader) {
      return NextResponse.json({ message: 'No autorizado: Falta token' }, { status: 401 });
    }

    // 3. Leer el cuerpo del producto a crear
    const body = await request.json();

    // 4. Llamar al backend real, REENVIANDO el header de autorización.
    const apiResponse = await fetch(`${BACKEND_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Pasamos el header 'Authorization' intacto al backend real.
        // Así, el backend real sabe quién está haciendo la petición.
        'Authorization': authorizationHeader,
      },
      body: JSON.stringify(body),
    });

    // 5. Procesar la respuesta del backend
    const data = await apiResponse.json();
    
    // Devolvemos la respuesta (sea éxito o error) al frontend
    return NextResponse.json(data, { status: apiResponse.status });

  } catch (error) {
    return NextResponse.json(
      { message: 'Error interno del servidor (Next.js)' }, { status: 500 }
    );
  }
}