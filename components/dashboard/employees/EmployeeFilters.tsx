"use client"

import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { departments } from "@/lib/mock-data"
import { AddEmployeeForm } from "./add-employee-form"

interface EmployeeFiltersProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    selectedDepartment: string
    onDepartmentChange: (value: string) => void
}

export default function EmployeeFilters({
    searchTerm,
    onSearchChange,
    selectedDepartment,
    onDepartmentChange,
}: EmployeeFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search employees..."
                    className="w-full pl-9 sm:w-64"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                <SelectTrigger className="w-full sm:w-40">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Department" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.code}>
                            {dept.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
            </Button>

            <AddEmployeeForm />
        </div>
    )
}