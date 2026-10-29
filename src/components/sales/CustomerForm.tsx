"use client";

import React from "react";
import { User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CustomerFormProps {
  customerName: string;
  customerContact: string;
  onChangeCustomerName: (name: string) => void;
  onChangeCustomerContact: (contact: string) => void;
  disabled?: boolean;
}

export default function CustomerForm({
  customerName,
  customerContact,
  onChangeCustomerName,
  onChangeCustomerContact,
  disabled = false,
}: CustomerFormProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div>
        <label
          htmlFor="customer-name"
          className="mb-1 block text-xs font-medium text-muted-foreground"
        >
          Customer Name (Optional)
        </label>
        <div className="relative">
          <User className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            id="customer-name"
            type="text"
            placeholder="e.g. Adeola Johnson"
            value={customerName}
            onChange={(e) => onChangeCustomerName(e.target.value)}
            disabled={disabled}
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="customer-contact"
          className="mb-1 block text-xs font-medium text-muted-foreground"
        >
          Customer Contact (Optional)
        </label>
        <div className="relative">
          <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            id="customer-contact"
            type="text"
            placeholder="e.g. 08012345678"
            value={customerContact}
            onChange={(e) => onChangeCustomerContact(e.target.value)}
            disabled={disabled}
            className="pl-8 h-8 text-xs"
          />
        </div>
      </div>
    </div>
  );
}

