"use client";

import React from 'react';
import { X, Loader2, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
    title: string;
    message: string;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    title,
    message,
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Contenido del Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Cabecera */}
                <div className="flex items-start justify-between p-5 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Cuerpo */}
                <div className="p-6">
                    <p className="text-gray-600">{message}</p>
                </div>

                {/* Footer (Botones) */}
                <div className="flex items-center justify-end gap-3 p-5 bg-gray-50 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 cursor-pointer py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : null}
                        {isLoading ? 'Eliminando...' : 'Confirmar Eliminación'}
                    </button>
                </div>
            </div>
        </div>
    );
}

