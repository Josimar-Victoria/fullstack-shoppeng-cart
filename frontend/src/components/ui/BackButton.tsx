"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    onClick: () => void;
    text: string;
}

export default function BackButton({ onClick, text }: BackButtonProps) {
    return (
        <button
            onClick={onClick}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition cursor-pointer"
        >
            <ArrowLeft className="w-5 h-5" />
            {text}
        </button>
    );
}