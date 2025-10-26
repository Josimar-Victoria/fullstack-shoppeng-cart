"use client";

import { useState, useCallback } from 'react';
import axios, { AxiosError, Method } from 'axios';

// Interfaz genérica para la respuesta de la API
interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
  // Agrega aquí otras propiedades comunes que tenga tu API
}

// Opciones que aceptará nuestra función de petición
interface RequestConfig<T = unknown> {
  method: Method; // 'GET', 'POST', 'PUT', 'DELETE'
  url: string;      // La URL de la API (ej: '/api/products')
  body?: T;         // El cuerpo (body) para POST o PUT
  token?: string;   // El token de autorización (si la ruta es protegida)
}

// Lo que nuestro hook devolverá
interface UseApiState<T> {
  data: T | null;       // Los datos de la respuesta
  isLoading: boolean;   // true si está cargando
  error: string | null; // Mensaje de error

  /**
   * La función principal para ejecutar la petición.
   * Es asíncrona y devuelve un objeto con { success, data, error }
   * para que puedas reaccionar después de llamarla.
   */
  request: (
    config: RequestConfig
  ) => Promise<{ success: boolean; data?: T; error?: string }>;
}

/**
 * Un hook genérico y profesional para manejar CUALQUIER petición de API.
 * No se ejecuta solo. Devuelve una función 'request' para ser llamada
 * manualmente (ej: en un useEffect o en un onClick).
 * @returns { data, isLoading, error, request }
 */
export function useApi<T = unknown>(): UseApiState<T> {
  // --- Estados Internos del Hook ---
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Esta es la función principal que el componente llamará.
   * Usamos 'useCallback' para que esta función no se recree
   * en cada render, permitiendo usarla de forma segura en 'useEffect'.
   */
  const request = useCallback(
    async ({ method, url, body, token }: RequestConfig) => {
      // 1. Iniciar la carga y limpiar errores previos
      setIsLoading(true);
      setError(null);

      try {
        // 2. Construir los headers
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        // Si nos pasan un token, lo añadimos
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        // 3. Ejecutar la petición con Axios
        const response = await axios<T>({
          method,
          url,
          data: body, // Axios usa la clave 'data' para el body
          headers,
        });

        // 4. Petición exitosa
        setData(response.data); // Guardamos la respuesta completa
        setIsLoading(false);
        
        // Devolvemos éxito y los datos
        return { success: true, data: response.data };

      } catch (err) {
        // 5. Manejo de errores
        const axiosError = err as AxiosError<ApiResponse>;
        const errorMessage =
          axiosError.response?.data?.message || // Error de nuestra API (Next.js)
          axiosError.message ||                   // Error de Axios
          'Ocurrió un error desconocido';         // Error genérico

        console.error(`Error en useApi (${method} ${url}):`, axiosError);
        setError(errorMessage);
        setIsLoading(false);
        
        // Devolvemos fracaso y el mensaje de error
        return { success: false, error: errorMessage };
      }
    },
    [] // El array vacío asegura que 'request' se cree solo una vez
  );

  // Devolvemos los estados y la función
  return { data, isLoading, error, request };
}