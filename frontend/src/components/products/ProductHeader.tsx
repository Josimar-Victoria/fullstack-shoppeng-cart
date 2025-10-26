"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProductHeaderProps {
    onBack: () => void;
}

export default function ProductHeader({ onBack }: ProductHeaderProps) {
    return (
        <button
            onClick={onBack}
            className="mb-6 flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
        >
            <ArrowLeft className="w-5 h-5" />
            Volver
        </button>
    );
}