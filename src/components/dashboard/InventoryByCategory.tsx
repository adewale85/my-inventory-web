"use client"

import { useGetInventoryByCategory } from "@/hooks/dashboard/useGetInventoryByCategory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import InventoryBarChart from "../charts/InventoryBarChart";

export default function InventoryBtCategory() {
const  {inventory, isPendingDashboard} =
 useGetInventoryByCategory();

 if (isPendingDashboard) {
    return(
        <div className="p-6">
            Loading Inventory...
        </div>
    )
 }

 if (!inventory?.length) {
    return(
        <div>No inventory found</div>
    )
 }

 return(
    <Card>
        <CardHeader>
        <CardTitle>
            Inventory by Category
        </CardTitle>
        <CardDescription>
            Total quantity grouped by category
        </CardDescription>
        </CardHeader>
        <CardContent>
            <InventoryBarChart data={inventory}/>
        </CardContent>
        

       
    </Card>
 )

}
   
