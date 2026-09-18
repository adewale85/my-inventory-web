"use client"


import PageWrapper from '@/components/PageWrapper'
import StockMovementForm from '@/components/stock-movements/StockMovementForm'
import StockMovementHistory from '@/components/stock-movements/StockMovementHistory'
import React from 'react'

export default function stockMovementPage() {
  return (
    <PageWrapper>
       <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Stock Movement
        </h1>

        <p className="text-muted-foreground">
          Process stock in or out and view movement history.
        </p>
      </div>

      <StockMovementForm />

      <StockMovementHistory />
    </div>
    </PageWrapper>
  )
}

