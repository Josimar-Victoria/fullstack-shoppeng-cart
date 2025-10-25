"use client"
// components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Search, LogIn, UserPlus } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import AuthModals from './modals/AuthModals';

export default function Header() {
  const { searchTerm, setSearchTerm, getTotalItems } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login');
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenLogin = () => {
    setAuthModalView('login');
    setShowAuthModal(true);
    setShowUserMenu(false);
  };

  const handleOpenRegister = () => {
    setAuthModalView('register');
    setShowAuthModal(true);
    setShowUserMenu(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <ShoppingCart className="w-8 h-8" />
              <h1 className="text-xl font-bold hidden sm:block">ShopHub</h1>
            </Link>
            
            {/* Barra de Búsqueda */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos y eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* Iconos de Usuario y Carrito */}
            <div className="flex items-center gap-3">
              <Link
                href="/carrito"
                className="relative p-2 hover:bg-blue-500 rounded-full transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
              
              {/* Dropdown de Usuario */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 hover:bg-blue-500 rounded-full transition cursor-pointer"
                >
                  <User className="w-6 h-6" />
                </button>

                {/* Menú Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-2">
                      {/* Opción Login */}
                      <button
                        onClick={handleOpenLogin}
                        className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:bg-blue-50 transition"
                      >
                        <LogIn className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <p className="font-semibold">Iniciar Sesión</p>
                          <p className="text-xs text-gray-500">Accede a tu cuenta</p>
                        </div>
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>

                      {/* Opción Registro */}
                      <button
                        onClick={handleOpenRegister}
                        className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:bg-blue-50 transition"
                      >
                        <UserPlus className="w-5 h-5 text-green-600 cursor-pointer" />
                        <div className="text-left">
                          <p className="font-semibold ">Registrarse</p>
                          <p className="text-xs text-gray-500">Crea una cuenta nueva</p>
                        </div>
                      </button>
                    </div>

                    {/* Footer del dropdown */}
                    <div className="from-blue-50 to-purple-50 px-4 py-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600 text-center">
                        ¿Nuevo en ShopHub? 
                        <button 
                          onClick={handleOpenRegister}
                          className="text-blue-600 font-semibold ml-1 cursor-pointer hover:text-blue-700"
                        >
                          Únete ahora
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Autenticación */}
      <AuthModals
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialView={authModalView}
      />
    </>
  );
}