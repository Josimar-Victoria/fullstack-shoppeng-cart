import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001';

// Tipo para los parámetros dinámicos de la ruta
type Context = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/products/:id - Ver un producto (Público)
 * No requiere autenticación
 */
export async function GET(request: Request, context: Context) {
  try {
    // Await params en Next.js 15+
    const { id } = await context.params;
    
    const apiResponse = await fetch(`${BACKEND_URL}/products/${id}`, {
      next: { revalidate: 60 }, // Cache por 60 segundos
    });
    
    // Si el producto no existe, devolvemos 404
    if (apiResponse.status === 404) {
      return NextResponse.json(
        { message: 'Producto no encontrado' }, 
        { status: 404 }
      );
    }

    const data = await apiResponse.json();
    return NextResponse.json(data, { status: apiResponse.status });

  } catch (error) {
    console.error('Error en GET /api/products/[id]:', error);
    return NextResponse.json(
      { message: 'Error interno al obtener el producto' }, 
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/:id - Actualizar un producto (Protegido)
 * Requiere token de autenticación
 */
export async function PUT(request: Request, context: Context) {
  try {
    // Await params
    const { id } = await context.params;
    
    // 1. Validar token de autorización
    const authorizationHeader = request.headers.get('Authorization');

    if (!authorizationHeader) {
      return NextResponse.json(
        { message: 'No autorizado: Token requerido' }, 
        { status: 401 }
      );
    }

    // 2. Validar formato del token
    if (!authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Formato de token inválido. Debe ser: Bearer <token>' }, 
        { status: 401 }
      );
    }

    // 3. Leer el cuerpo de la petición
    const body = await request.json();

    // 4. Validar que haya datos para actualizar
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: 'No se proporcionaron datos para actualizar' }, 
        { status: 400 }
      );
    }

    // 5. Llamar al backend
    const apiResponse = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorizationHeader,
      },
      body: JSON.stringify(body),
    });

    // 6. Manejar errores del backend
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(errorData, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    return NextResponse.json(data, { status: apiResponse.status });

  } catch (error) {
    console.error('Error en PUT /api/products/[id]:', error);
    return NextResponse.json(
      { message: 'Error interno al actualizar el producto' }, 
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/:id - Eliminar un producto (Protegido)
 * Requiere token de autenticación
 */
export async function DELETE(request: Request, context: Context) {
  try {
    // Await params
    const { id } = await context.params;
    
    // 1. Validar token de autorización
    const authorizationHeader = request.headers.get('Authorization');

    if (!authorizationHeader) {
      return NextResponse.json(
        { message: 'No autorizado: Token requerido' }, 
        { status: 401 }
      );
    }

    // 2. Validar formato del token
    if (!authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Formato de token inválido. Debe ser: Bearer <token>' }, 
        { status: 401 }
      );
    }

    // 3. Llamar al backend para eliminar
    const apiResponse = await fetch(`${BACKEND_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': authorizationHeader,
      },
    });
    
    // 4. Manejo de respuesta exitosa (204 No Content)
    if (apiResponse.status === 204) {
      console.log(`✅ Producto ${id} eliminado exitosamente`);
      return new NextResponse(null, { status: 204 });
    }

    // 5. Manejo de errores específicos
    if (apiResponse.status === 404) {
      return NextResponse.json(
        { message: 'Producto no encontrado' }, 
        { status: 404 }
      );
    }

    if (apiResponse.status === 403) {
      return NextResponse.json(
        { message: 'No tienes permiso para eliminar este producto' }, 
        { status: 403 }
      );
    }

    // 6. Otros errores con cuerpo
    try {
      const errorData = await apiResponse.json();
      return NextResponse.json(errorData, { status: apiResponse.status });
    } catch {
      // Si no hay cuerpo JSON, devolvemos error genérico
      return NextResponse.json(
        { message: 'Error al eliminar el producto' }, 
        { status: apiResponse.status }
      );
    }

  } catch (error) {
    console.error('Error en DELETE /api/products/[id]:', error);
    return NextResponse.json(
      { message: 'Error interno al eliminar el producto' }, 
      { status: 500 }
    );
  }
}