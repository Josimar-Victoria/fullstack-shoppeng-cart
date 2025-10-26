import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

/**
 * Función que maneja las peticiones POST a /api/auth/login
 * Actúa como proxy.
 */
export async function POST(request: Request) {
  try {
    // 1. Extraer el cuerpo (body) de la petición del frontend.
    // Esto contiene { email, password }
    const body = await request.json();

    // 2. Realizar la petición 'fetch' a nuestro backend real.
    const apiResponse = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // 3. Obtener la respuesta del backend (ej: { user, token, message })
    const data = await apiResponse.json();

    // 4. Manejo de errores del backend (ej: 401 Credenciales inválidas).
    if (!apiResponse.ok) {
      return NextResponse.json(data, { status: apiResponse.status });
    }
    // 5. Éxito.
    return NextResponse.json(data, { status: apiResponse.status });

  } catch (error) {
    // 6. Manejo de errores de red o de Next.js.
    // Si el 'fetch' falla (ej: el backend está caído) o 'request.json()' falla,
    // capturamos el error y devolvemos un error 500 genérico.
    return NextResponse.json(
      { message: 'Error interno del servidor (Next.js)' },
      { status: 500 }
    );
  }
}