"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Calendar,
  CreditCard,
  Banknote,
  Building2,
  RefreshCw,
  AlertCircle,
  Receipt,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSales } from "@/hooks/sales/useGetSales";
import { useAuthStore } from "@/zustand/useAuthStore";
import { Sale } from "@/types/sales";
import { formatNaira } from "@/lib/utils";
import SaleDetailModal from "./SaleDetailModal";

const ITEMS_PER_PAGE = 10;

export default function SalesHistoryTable() {
  const { sales, isPending, error, refetch } = useGetSales();
  const auth = useAuthStore((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  // Filter sales list based on search and payment method
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      // Payment filter
      if (paymentFilter !== "ALL" && sale.payment_method !== paymentFilter) {
        return false;
      }

      // Search term
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();

      const customer = (sale.customer_name || "").toLowerCase();
      const contact = (sale.customer_contact || "").toLowerCase();
      const id = sale.id.toLowerCase();
      const method = (sale.payment_method || "").toLowerCase();
      const cashier = (sale.cashier_name || "").toLowerCase();

      return (
        customer.includes(term) ||
        contact.includes(term) ||
        id.includes(term) ||
        method.includes(term) ||
        cashier.includes(term)
      );
    });
  }, [sales, searchTerm, paymentFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredSales.length / ITEMS_PER_PAGE) || 1;
  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSales.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSales, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Helper for Cashier Name display
  const getCashierDisplay = (sale: Sale) => {
    if (sale.cashier_name) return sale.cashier_name;
    if (auth?.user?.id && sale.sold_by === auth.user.id) {
      return auth.user.name || "You";
    }
    return `User #${sale.sold_by ? sale.sold_by.slice(0, 6) : "N/A"}`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-xs space-y-4">
      {/* Table Header & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="size-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">
              Sales History
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit past transactions, payment records, and sold items.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter by customer, ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 h-8 text-xs rounded-lg"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-xs">
            <button
              type="button"
              onClick={() => {
                setPaymentFilter("ALL");
                setCurrentPage(1);
              }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                paymentFilter === "ALL"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => {
                setPaymentFilter("Cash");
                setCurrentPage(1);
              }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                paymentFilter === "Cash"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Cash
            </button>
            <button
              type="button"
              onClick={() => {
                setPaymentFilter("Bank Transfer");
                setCurrentPage(1);
              }}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                paymentFilter === "Bank Transfer"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Transfer
            </button>
          </div>

          {/* Refresh Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isPending}
            className="h-8 px-2.5 gap-1 text-xs"
          >
            <RefreshCw className={`size-3.5 ${isPending ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>Failed to load sales history: {(error as Error).message}</span>
          </div>
          <Button
            variant="outline"
            size="xs"
            onClick={() => refetch()}
            className="text-xs"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50 text-xs">
            <TableRow>
              <TableHead className="py-2.5">Date & Time</TableHead>
              <TableHead className="py-2.5">Reference ID</TableHead>
              <TableHead className="py-2.5">Customer</TableHead>
              <TableHead className="py-2.5">Payment</TableHead>
              <TableHead className="py-2.5 text-right">Total Amount</TableHead>
              <TableHead className="py-2.5">Cashier</TableHead>
              <TableHead className="py-2.5 text-right w-24">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-xs">
            {isPending ? (
              // Loading Skeleton Rows
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="py-3">
                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="ml-auto h-4 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="ml-auto h-6 w-16 animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredSales.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-muted-foreground"
                >
                  <Receipt className="mx-auto size-8 stroke-[1.5] text-muted-foreground/40 mb-2" />
                  <p className="text-sm font-medium text-foreground">
                    No sales records found
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {searchTerm
                      ? `No transactions match your search filter.`
                      : "Complete your first sale above to view it in the history."}
                  </p>
                </TableCell>
              </TableRow>
            ) : ( 
              paginatedSales.map((sale) => {
                const dateObj = new Date(sale.created_at);
                const formattedDate = dateObj.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                const formattedTime = dateObj.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const isCash = sale.payment_method?.toLowerCase().includes("cash");

                return (
                  <TableRow key={sale.id} className="hover:bg-muted/40 transition">
                    {/* Date */}
                    <TableCell className="py-3">
                      <div>
                        <span className="font-medium text-foreground block">
                          {formattedDate}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {formattedTime}
                        </span>
                      </div>
                    </TableCell>

                    {/* Reference ID */}
                    <TableCell className="py-3 font-mono font-medium text-muted-foreground">
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-foreground">
                        #{sale.id.slice(0, 8)}
                      </span>
                    </TableCell>

                    {/* Customer */}
                    <TableCell className="py-3">
                      <div>
                        <span className="font-semibold text-foreground block">
                          {sale.customer_name || "Walk-in Customer"}
                        </span>
                        {sale.customer_contact && (
                          <span className="text-[11px] text-muted-foreground block">
                            {sale.customer_contact}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Payment Method */}
                    <TableCell className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold border ${
                          isCash
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                            : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                        }`}
                      >
                        {isCash ? (
                          <Banknote className="size-3" />
                        ) : (
                          <Building2 className="size-3" />
                        )}
                        <span>{sale.payment_method}</span>
                      </span>
                    </TableCell>

                    {/* Total Amount */}
                    <TableCell className="py-3 text-right">
                      <span className="font-bold text-foreground text-sm">
                        {formatNaira(sale.total_amount)}
                      </span>
                    </TableCell>

                    {/* Cashier */}
                    <TableCell className="py-3">
                      <span className="text-muted-foreground">
                        {getCashierDisplay(sale)}
                      </span>
                    </TableCell>

                    {/* Inspect Button */}
                    <TableCell className="py-3 text-right">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSale(sale)}
                        className="h-7 gap-1 px-2 text-xs"
                      >
                        <Eye className="size-3.5" />
                        <span>Items</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredSales.length)} of {" "}
            {filteredSales.length} sales
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="h-7 w-7 p-0"
            >
              <ChevronLeft className="size-3.5" />
            </Button>
            <span className="px-2 text-xs font-semibold text-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="h-7 w-7 p-0"
            >
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Inspection Modal */}
      <SaleDetailModal
        sale={selectedSale}
        open={!!selectedSale}
        onOpenChange={(open) => {
          if (!open) setSelectedSale(null);
        }}
      />
    </div>
  );
}

