"use client";
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteErrorToastProps {
    error: string;
}

export default function DeleteErrorToast({ error }: DeleteErrorToastProps) {
    return (
        <div className="fixed bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg animate-in slide-in-from-bottom z-50">
            <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                <div>
                    <p className="font-semibold">Error al eliminar</p>
                    <p className="text-sm">{error}</p>
                </div>
            </div>
        </div>
    );
}