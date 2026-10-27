import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { MENU_ITEMS } from '../data/menu';

const CartContext = createContext();
const STORAGE_KEY = 'donerbros_cart_v1';

const loadCart = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        // Drop items that no longer exist in the menu
        return Object.fromEntries(
            Object.entries(parsed).filter(([id, qty]) => MENU_ITEMS.some(i => i.id === id) && qty > 0)
        );
    } catch {
        return {};
    }
};

export const CartProvider = ({ children }) => {
    const [quantities, setQuantities] = useState(loadCart); // { [itemId]: qty }
    const [isOpen, setIsOpen] = useState(false);
    const [lastAdded, setLastAdded] = useState(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    }, [quantities]);

    const addItem = useCallback((id) => {
        setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
        setLastAdded({ id, ts: Date.now() });
    }, []);

    const removeItem = useCallback((id) => {
        setQuantities(prev => {
            const next = { ...prev };
            if (!next[id]) return prev;
            next[id] -= 1;
            if (next[id] <= 0) delete next[id];
            return next;
        });
    }, []);

    const deleteItem = useCallback((id) => {
        setQuantities(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    }, []);

    const clearCart = useCallback(() => setQuantities({}), []);

    const lines = useMemo(() =>
        Object.entries(quantities)
            .map(([id, qty]) => {
                const item = MENU_ITEMS.find(i => i.id === id);
                return item ? { item, qty, lineTotal: item.price * qty } : null;
            })
            .filter(Boolean),
        [quantities]);

    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);

    const value = {
        quantities, lines, count, subtotal,
        addItem, removeItem, deleteItem, clearCart,
        isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
        lastAdded,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within a CartProvider');
    return ctx;
};
