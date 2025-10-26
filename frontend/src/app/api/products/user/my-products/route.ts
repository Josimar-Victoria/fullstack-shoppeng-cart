import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

/**
 * GET /api/products/user/my-products - Ver mis productos (Protegido)
 */
export async function GET(request: Request) {
  try {
    // 1. Leer el header 'Authorization' que envía el frontend.
    const authorizationHeader = request.headers.get('Authorization');

    // 2. Validar que el token exista.
    if (!authorizationHeader) {
      return NextResponse.json({ message: 'No autorizado: Falta token' }, { status: 401 });
    }

    // 3. Llamar al backend real, REENVIANDO el header de autorización.
    const apiResponse = await fetch(`${BACKEND_URL}/products/user/my-products`, {
      method: 'GET',
      headers: {
        'Authorization': authorizationHeader, // Reenviamos el token
      },
      // 'cache: 'no-store'' es CRUCIAL aquí.
      // Le dice a Next.js que NUNCA cachee esta respuesta,
      // ya que son datos privados y dinámicos de un usuario específico.
      cache: 'no-store',
    });

    const data = await apiResponse.json();
    return NextResponse.json(data, { status: apiResponse.status });

  } catch (error) {
    return NextResponse.json({ message: 'Error interno (Next.js)' }, { status: 500 });
  }
}