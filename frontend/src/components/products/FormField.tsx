"use client";
import React from 'react';
import {
    Package, Calendar, Image as ImageIcon, DollarSign,
    List, FileText, Star, Hash, LucideIcon
} from 'lucide-react';

// Mapeo de íconos
const iconMap: { [key: string]: LucideIcon } = {
    Package,
    Calendar,
    ImageIcon,
    DollarSign,
    List,
    FileText,
    Star,
    Hash
};

interface FormFieldProps {
    label: string;
    type: 'text' | 'number' | 'select' | 'textarea';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    icon: string;
    options?: { value: string; label: string }[];
    required?: boolean;
    disabled?: boolean;
    min?: string;
    max?: string;
    step?: string;
    rows?: number;
}

export default function FormField({
    label,
    type,
    value,
    onChange,
    placeholder,
    icon,
    options,
    required,
    disabled,
    min,
    max,
    step,
    rows
}: FormFieldProps) {
    const IconComponent = iconMap[icon];

    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:bg-gray-50"
                    >
                        {options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        rows={rows}
                        disabled={disabled}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                );

            default:
                return (
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        min={min}
                        max={max}
                        step={step}
                        disabled={disabled}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                    />
                );
        }
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                {IconComponent && <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />}
                {renderInput()}
            </div>
        </div>
    );
}