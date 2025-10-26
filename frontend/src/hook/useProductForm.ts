"use client";
import { useState, useCallback } from 'react';

export interface ProductFormData {
  name: string;
  price: string;
  type: 'product' | 'event';
  stock: string;
  image: string;
  category: string;
  description: string;
  rating: string;
}

export type FormField = keyof ProductFormData;

export function useProductForm() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    type: 'product',
    stock: '1',
    image: '💻',
    category: 'Tecnología',
    description: '',
    rating: '4.5'
  });

  const [formError, setFormError] = useState<string | null>(null);

  // Usar useCallback para estabilizar las funciones
  const updateField = useCallback((field: FormField, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const setFormDataDirectly = useCallback((data: ProductFormData) => {
    setFormData(data);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      price: '',
      type: 'product',
      stock: '1',
      image: '💻',
      category: 'Tecnología',
      description: '',
      rating: '4.5'
    });
    setFormError(null);
  }, []);

  const setFormErrorDirectly = useCallback((error: string | null) => {
    setFormError(error);
  }, []);

  return {
    formData,
    formError,
    updateField,
    setFormError: setFormErrorDirectly,
    setFormData: setFormDataDirectly,
    resetForm
  };
}