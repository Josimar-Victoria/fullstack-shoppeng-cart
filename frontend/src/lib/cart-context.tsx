"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Item, CartItem, FilterType } from './types';

interface CartContextType {
    cart: CartItem[];
    searchTerm: string;
    filterType: FilterType;
    addToCart: (item: Item, quantity?: number) => void;
    updateQuantity: (itemId: number, newQuantity: number) => void;
    removeFromCart: (itemId: number) => void;
    getCartItemQuantity: (itemId: number) => number;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    setSearchTerm: (term: string) => void;
    setFilterType: (type: FilterType) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');

    const addToCart = (item: Item, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(i => i.id === item.id);
            if (existingItem) {
                return prevCart.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: Math.min(i.quantity + quantity, item.stock) }
                        : i
                );
            }
            return [...prevCart, { ...item, quantity }];
        });
    };

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: Math.min(newQuantity, item.stock) }
                        : item
                )
            );
        }
    };

    const removeFromCart = (itemId: number) => {
        setCart(prevCart => prevCart.filter(i => i.id !== itemId));
    };

    const getCartItemQuantity = (itemId: number): number => {
        return cart.find(i => i.id === itemId)?.quantity || 0;
    };

    const getTotalItems = (): number => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getTotalPrice = (): number => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                searchTerm,
                filterType,
                addToCart,
                updateQuantity,
                removeFromCart,
                getCartItemQuantity,
                getTotalItems,
                getTotalPrice,
                setSearchTerm,
                setFilterType,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}