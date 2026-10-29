"use client";

import { useState, useMemo, useCallback } from "react";
import { CartItem } from "@/types/sales";

export interface UseSaleCartReturn {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  itemCount: number;
  totalQuantity: number;
  validationErrors: string[];
  isCartValid: boolean;
  getItemQuantity: (productId: string) => number;
}

/**
 * Custom hook to manage sales cart operations:
 * - Adding, updating, and removing items
 * - Enforcing available stock limits and positive quantities
 * - Computing item subtotals and order total
 * - Validating cart state before checkout
 */
export const useSaleCart = (initialItems: CartItem[] = []): UseSaleCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  // Add a product or increment existing quantity up to availableStock
  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.productId === item.productId);
      if (existing) {
        // Increment quantity up to available stock limit
        const newQty = Math.min(existing.quantity + 1, item.availableStock);
        return prev.map((c) =>
          c.productId === item.productId ? { ...c, quantity: newQty } : c
        );
      }
      return [...prev, item];
    });
  }, []);

  // Update quantity directly, clamping between 1 and availableStock
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;
        const validQty = Math.max(1, Math.min(quantity, item.availableStock));
        return { ...item, quantity: validQty };
      })
    );
  }, []);

  // Remove an individual item from the cart
  const removeItem = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  // Clear the entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Derived order subtotal & total
  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity * item.sellingPrice,
      0
    );
  }, [cartItems]);

  const subtotal = total;

  // Total individual items in cart
  const itemCount = cartItems.length;

  // Aggregate quantity across all items
  const totalQuantity = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Derived validation results
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    if (cartItems.length === 0) {
      errors.push("Cart is empty.");
      return errors;
    }

    cartItems.forEach((item) => {
      if (item.quantity <= 0) {
        errors.push(`"${item.productName}" has an invalid quantity.`);
      }
      if (item.quantity > item.availableStock) {
        errors.push(
          `"${item.productName}" exceeds available stock (${item.availableStock}).`
        );
      }
      if (item.sellingPrice <= 0) {
        errors.push(`"${item.productName}" has no valid selling price.`);
      }
    });

    return errors;
  }, [cartItems]);

  const isCartValid = cartItems.length > 0 && validationErrors.length === 0;

  const getItemQuantity = useCallback(
    (productId: string) => {
      return cartItems.find((c) => c.productId === productId)?.quantity ?? 0;
    },
    [cartItems]
  );

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    subtotal,
    itemCount,
    totalQuantity,
    validationErrors,
    isCartValid,
    getItemQuantity,
  };
};

