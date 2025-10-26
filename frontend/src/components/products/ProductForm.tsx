"use client";
import React from 'react';
import { Save, Plus, LucideIcon } from 'lucide-react';
import FormFieldComponent from './FormField';
import FormActions from './FormActions';
import { FormField, ProductFormData } from '@/hook/useProductForm';

interface ProductFormProps {
    formData: ProductFormData;
    isLoading: boolean;
    formError: string | null;
    apiError: string | null;
    onUpdateField: (field: FormField, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    submitButtonText?: string;
    submitButtonIcon?: 'Save' | 'Plus';
    buttonColor?: string;
}

export default function ProductForm({
    formData,
    isLoading,
    formError,
    apiError,
    onUpdateField,
    onSubmit,
    submitButtonText = "Crear Producto",
    submitButtonIcon = "Plus",
    buttonColor = "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
}: ProductFormProps) {
    const getButtonIcon = (): LucideIcon => {
        return submitButtonIcon === 'Save' ? Save : Plus;
    };

    return (
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">

            {/* Fila 1: Nombre y Tipo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormFieldComponent
                    label="Nombre del Producto"
                    type="text"
                    value={formData.name}
                    onChange={(value: string) => onUpdateField('name', value)}
                    placeholder="Ej: Laptop Gaming Pro"
                    icon="Package"
                    required
                    disabled={isLoading}
                />

                <FormFieldComponent
                    label="Tipo de Item"
                    type="select"
                    value={formData.type}
                    onChange={(value: string) => onUpdateField('type', value)}
                    options={[
                        { value: 'product', label: 'Producto' },
                        { value: 'event', label: 'Evento' }
                    ]}
                    icon="List"
                    disabled={isLoading}
                />
            </div>

            {/* Fila 2: Precio, Stock y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormFieldComponent
                    label="Precio (USD)"
                    type="number"
                    value={formData.price}
                    onChange={(value: string) => onUpdateField('price', value)}
                    placeholder="Ej: 1299.99"
                    icon="DollarSign"
                    min="0.01"
                    step="0.01"
                    required
                    disabled={isLoading}
                />

                <FormFieldComponent
                    label="Stock"
                    type="number"
                    value={formData.stock}
                    onChange={(value: string) => onUpdateField('stock', value)}
                    placeholder="Ej: 5"
                    icon="Hash"
                    min="0"
                    step="1"
                    required
                    disabled={isLoading}
                />

                <FormFieldComponent
                    label="Categoría"
                    type="text"
                    value={formData.category}
                    onChange={(value: string) => onUpdateField('category', value)}
                    placeholder="Ej: Tecnología"
                    icon="List"
                    required
                    disabled={isLoading}
                />
            </div>

            {/* Fila 3: Imagen y Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormFieldComponent
                    label="Imagen (Emoji o URL)"
                    type="text"
                    value={formData.image}
                    onChange={(value: string) => onUpdateField('image', value)}
                    placeholder="Ej: 💻 o https://..."
                    icon="ImageIcon"
                    required
                    disabled={isLoading}
                />

                <FormFieldComponent
                    label="Rating (0.0 - 5.0)"
                    type="number"
                    value={formData.rating}
                    onChange={(value: string) => onUpdateField('rating', value)}
                    placeholder="Ej: 4.8"
                    icon="Star"
                    min="0.0"
                    max="5.0"
                    step="0.1"
                    required
                    disabled={isLoading}
                />
            </div>

            {/* Descripción */}
            <FormFieldComponent
                label="Descripción"
                type="textarea"
                value={formData.description}
                onChange={(value: string) => onUpdateField('description', value)}
                placeholder="Describe tu producto en detalle..."
                icon="FileText"
                rows={5}
                required
                disabled={isLoading}
            />

            {/* Errores y Acciones */}
            <FormActions
                isLoading={isLoading}
                formError={formError}
                apiError={apiError}
                submitButtonText={submitButtonText}
                submitButtonIcon={getButtonIcon()}
                buttonColor={buttonColor}
            />
        </form>
    );
}