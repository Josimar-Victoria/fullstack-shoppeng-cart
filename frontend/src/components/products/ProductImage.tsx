"use client";
import React from 'react';

interface ProductImageProps {
    image: string;
    name: string;
}

export default function ProductImage({ image, name }: ProductImageProps) {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 flex items-center justify-center">
            {image.startsWith('http') ? (
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                />
            ) : (
                <div className="text-9xl">{image}</div>
            )}
        </div>
    );
}