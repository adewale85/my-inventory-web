"use client"

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function ProductFilters () {
    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
                <Input placeholder="Search products..." className="pl-10"/>
            </div>

            <Select>
                <SelectTrigger className="w-full md:w-48rem">
                <SelectValue placeholder="Category"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                </SelectContent>
            </Select>


            <Select>
                <SelectTrigger className="w-full md:w-48rem">
                <SelectValue placeholder="Status"/>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="all">Inactive</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}