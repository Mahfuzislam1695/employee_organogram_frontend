
"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { positions } from "@/lib/mock-data"
import { AddPositionForm } from "./add-position-form"
import PositionHierarchyCard from "./PositionHierarchyCard"
import PositionTable from "./PositionTable"


export default function Positions() {
    const [searchTerm, setSearchTerm] = useState("")

    // Filter positions based on search term
    const filteredPositions = positions.filter(
        (position) =>
            position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            position.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Position Management</h1>
                    <p className="text-sm text-gray-600">Configure job hierarchy and position details</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search positions..."
                            className="w-full pl-9 sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <AddPositionForm />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <PositionHierarchyCard positions={positions} />
                <PositionTable positions={filteredPositions} />
            </div>
        </>
    )
}