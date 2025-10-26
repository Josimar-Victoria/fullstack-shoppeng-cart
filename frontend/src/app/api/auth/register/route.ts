import { NextResponse } from 'next/server';

// Obtenemos la URL de nuestro backend real desde las variables de entorno.
// Es una buena práctica para no 'quemar' (hardcodear) URLs en el código.
const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

/**
 * Función que maneja las peticiones POST a /api/auth/register
 * Actúa como un proxy: recibe la petición del frontend y la reenvía
 * al backend real de NestJS.
 */
export async function POST(request: Request) {
  try {
    // 1. Extraer el cuerpo (body) de la petición del frontend.
    // Esto contiene { email, password, name }
    const body = await request.json();

    // 2. Realizar la petición 'fetch' a nuestro backend real.
    // Usamos la misma información que nos mandó el frontend.
    const apiResponse = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 3. Obtener la respuesta del backend.
    // 'apiResponse.json()' parsea el JSON que el backend nos devuelve.
    const data = await apiResponse.json();

    // 4. Manejo de errores del backend.
    // Si el backend (ej: http://localhost:3000) respondió con un error (400, 409, 500, etc.),
    // 'apiResponse.ok' será 'false'.
    // Reenviamos esa misma respuesta de error al frontend.
    if (!apiResponse.ok) {
      return NextResponse.json(data, { status: apiResponse.status });
    }

    // 5. Éxito.
    // Reenviamos la respuesta exitosa del backend (que incluye el token y el usuario)
    // al frontend, junto con el status code original (ej: 201 Created).
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