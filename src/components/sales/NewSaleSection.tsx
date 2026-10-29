"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { CartItem, PaymentMethod } from "@/types/sales";
import { useSaleCart } from "@/hooks/sales/useSaleCart";
import { useProcessSale } from "@/hooks/sales/useProcessSale";
import ProductSearchSelector from "./ProductSearchSelector";
import CurrentSaleCart from "./CurrentSaleCart";
import CustomerForm from "./CustomerForm";
import PaymentMethodSelector from "./PaymentMethodSelector";
import SaleSummary from "./SaleSummary";
import ConfirmSaleButton from "./ConfirmSaleButton";

export default function NewSaleSection() {
  // 1. Cart state & business logic managed by custom hook
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    subtotal,
    validationErrors,
    isCartValid,
  } = useSaleCart();

  // 2. Checkout form state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [lastSaleId, setLastSaleId] = useState<string | null>(null);

  // 3. Database transaction mutation hook
  const { processSaleAsync, isPending } = useProcessSale();

  // Clear cart and customer info
  const handleClearCart = () => {
    clearCart();
    setCustomerName("");
    setCustomerContact("");
  };

  // Submit sale through the secure PostgreSQL RPC function
  const handleConfirmSale = async () => {
    if (!isCartValid || isPending) return;

    try {
      const saleId = await processSaleAsync({
        items: cartItems,
        paymentMethod,
        customerName: customerName.trim() || undefined,
        customerContact: customerContact.trim() || undefined,
      });

      setLastSaleId(saleId);
      toast.success("Sale processed successfully!", {
        description: `Reference ID: #${saleId.slice(0, 8)}`,
      });

      // Reset cart and customer fields upon successful completion
      handleClearCart();
    } catch (err: any) {
      toast.error(err.message || "Failed to process sale.");
    }
  };

  const handleAddToCartWithResetNotice = (item: CartItem) => {
    addToCart(item);
    setLastSaleId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
      {/* ================= LEFT COLUMN: Search & Select Products ================= */}
      <div className="lg:col-span-5 xl:col-span-5 h-full">
        <ProductSearchSelector
          onAddToCart={handleAddToCartWithResetNotice}
          cartItems={cartItems}
        />
      </div>

      {/* ================= RIGHT COLUMN: Cart & POS Checkout ================= */}
      <div className="lg:col-span-7 xl:col-span-7 flex flex-col rounded-xl border border-border bg-card p-4 shadow-xs">
        {/* Cart items list / empty state */}
        <CurrentSaleCart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={handleClearCart}
          disabled={isPending}
          lastSaleId={lastSaleId}
          onDismissLastSale={() => setLastSaleId(null)}
        />

        {/* Customer Details, Payment, Summary, and Checkout Button */}
        <div className="mt-3 border-t border-border pt-4 space-y-4">
          <CustomerForm
            customerName={customerName}
            customerContact={customerContact}
            onChangeCustomerName={setCustomerName}
            onChangeCustomerContact={setCustomerContact}
            disabled={isPending}
          />

          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onChangeMethod={setPaymentMethod}
            disabled={isPending}
          />

          <SaleSummary
            subtotal={subtotal}
            total={total}
            validationErrors={validationErrors}
            hasItems={cartItems.length > 0}
          />

          <ConfirmSaleButton
            total={total}
            paymentMethod={paymentMethod}
            disabled={!isCartValid}
            isLoading={isPending}
            onClick={handleConfirmSale}
          />
        </div>
      </div>
    </div>
  );
}
