"use client";
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 flex justify-center items-center min-h-[60vh]">
            <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
        </div>
    );
}