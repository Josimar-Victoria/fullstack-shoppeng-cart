"use client"
// components/AuthModals.tsx
import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';

// --- 1. Importamos nuestro hook (ruta actualizada) ---
import { useApi } from '@/hook/useApi';

// --- 2. Definimos la respuesta de la API de Auth ---
// (Tanto Login como Register devuelven esto)
interface AuthResponse {
  message: string;
  user: { id: string; name: string; email: string };
  token: string;
}

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export default function AuthModals({ isOpen, onClose, initialView = 'login' }: AuthModalsProps) {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados para Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados para Registro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // --- 3. Inicializamos el hook y el estado de error del formulario ---
  const { data, isLoading, error: apiHookError, request } = useApi<AuthResponse>();
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  // --- 4. Actualizamos handleLogin ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Limpiamos errores previos

    const { success, data, error } = await request({
      method: 'POST',
      url: '/api/auth/login', // Llamamos a nuestra API de Next.js
      body: {
        email: loginEmail,
        password: loginPassword,
      }
    });

    if (success && data) {
      console.log('Login Exitoso:', data);

      // --- ¡LÓGICA DE LOCALSTORAGE AÑADIDA! ---
      // 1. Guardamos el token y el usuario en localStorage.
      // Guardamos el token como un string
      localStorage.setItem('authToken', data.token);
      // Guardamos el objeto 'user' como un string JSON
      localStorage.setItem('authUser', JSON.stringify(data.user));

      // 2. (TODO) Ahora, actualiza tu estado global (Context)
      // para que toda la app sepa que el usuario está logueado
      // sin tener que recargar la página.
      // Por ejemplo: auth.login(data.user, data.token);
      // --- FIN DE LA MODIFICACIÓN ---

      onClose();
    } else {
      // Si la API falla, mostramos el error
      setFormError(error || 'Error desconocido');
    }
  };

  // --- 5. Actualizamos handleRegister ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Limpiamos errores previos

    if (registerPassword !== registerConfirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }

    const { success, data, error } = await request({
      method: 'POST',
      url: '/api/auth/register', // Llamamos a nuestra API de Next.js
      body: {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }
    });

    if (success && data) {
      console.log('Registro Exitoso:', data);

      // --- ¡LÓGICA DE LOCALSTORAGE AÑADIDA! ---
      // 1. Guardamos también al registrar (auto-login)
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));

      // 2. (TODO) Actualiza tu estado global (Context)
      // Por ejemplo: auth.login(data.user, data.token);
      // --- FIN DE LA MODIFICACIÓN ---

      onClose();
    } else {
      setFormError(error || 'Error desconocido');
    }
  };

  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormError(null); // --- Limpiamos el error
  };

  const switchView = (newView: 'login' | 'register') => {
    resetForms();
    setView(newView);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-blue-500 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-2">
            {view === 'login' ? '¡Bienvenido de nuevo!' : '¡Únete a ShopHub!'}
          </h2>
          <p className="text-blue-100">
            {view === 'login'
              ? 'Ingresa tus credenciales para continuar'
              : 'Crea tu cuenta y comienza a comprar'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => switchView('login')}
            className={`flex-1 py-4 font-semibold transition cursor-pointer ${view === 'login'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => switchView('register')}
            className={`flex-1 py-4 font-semibold transition cursor-pointer ${view === 'register'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700 '
              }`}
          >
            Registrarse
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6">
          {view === 'login' ? (
            // Formulario de Login
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    disabled={isLoading} // --- Desactivar si está cargando
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading} // --- Desactivar si está cargando
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Olvidé mi contraseña */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* --- 6. Mostrar Error del Formulario --- */}
              {formError && (
                <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
                  {formError}
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isLoading} // --- Desactivar si está cargando
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* --- 7. Mostrar Spinner o Texto --- */}
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Iniciar Sesión'
                )}
              </button>

              {/* Divider y Social Login (sin cambios) */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">o continúa con</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">🔵</span>
                  <span className="font-semibold text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">📘</span>
                  <span className="font-semibold text-gray-700">Facebook</span>
                </button>
              </div>
            </form>
          ) : (
            // Formulario de Registro
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Juan Pérez"
                    required
                    disabled={isLoading} // --- Desactivar
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    disabled={isLoading} // --- Desactivar
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                    disabled={isLoading} // --- Desactivar
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    placeholder="Confirma tu contraseña"
                    required
                    disabled={isLoading} // --- Desactivar
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Términos y Condiciones (sin cambios) */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Acepto los{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Términos y Condiciones
                  </button>
                  {' '}y la{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Política de Privacidad
                  </button>
                </label>
              </div>

              {/* --- 6. Mostrar Error del Formulario --- */}
              {formError && (
                <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
                  {formError}
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isLoading} // --- Desactivar
                className="w-full py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* --- 7. Mostrar Spinner o Texto --- */}
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Crear Cuenta'
                )}
              </button>

              {/* Divider y Social Register (sin cambios) */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">o regístrate con</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">🔵</span>
                  <span className="font-semibold text-gray-700 cursor-pointer">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">📘</span>
                  <span className="font-semibold text-gray-700 cursor-pointer">Facebook</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

