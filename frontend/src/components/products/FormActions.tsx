"use client";
import React from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

interface FormActionsProps {
    isLoading: boolean;
    formError: string | null;
    apiError: string | null;
    submitButtonText?: string;
    submitButtonIcon?: LucideIcon;
    buttonColor?: string;
}

export default function FormActions({
    isLoading,
    formError,
    apiError,
    submitButtonText = "Crear Producto",
    submitButtonIcon: IconComponent,
    buttonColor = "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
}: FormActionsProps) {
    return (
        <>
            {/* Mostrar errores */}
            {formError && (
                <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
                    {formError}
                </div>
            )}

            {apiError && !formError && (
                <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center">
                    {apiError}
                </div>
            )}

            {/* Botón de submit */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 bg-gradient-to-r ${buttonColor} text-white font-bold text-lg rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <span className="flex items-center gap-2">
                            {IconComponent && <IconComponent className="w-6 h-6" />}
                            {submitButtonText}
                        </span>
                    )}
                </button>
            </div>
        </>
    );
}