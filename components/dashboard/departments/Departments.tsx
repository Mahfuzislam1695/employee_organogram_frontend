"use client"

import { useState } from "react"
import { Search, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { departments, employees, getDepartmentColorClass } from "@/lib/mock-data"
import { AddDepartmentForm } from "./add-department-form"
import DepartmentTable from "./DepartmentTable"
import DepartmentStatsCard from "./DepartmentStatsCard"
import DepartmentStructureCard from "./DepartmentStructureCard"


export default function DepartmentsPage() {
    const [searchTerm, setSearchTerm] = useState("")

    // Filter departments based on search term
    const filteredDepartments = departments.filter(
        (department) =>
            department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            department.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Count employees in each department
    const departmentsWithCount = filteredDepartments.map((department) => {
        const employeeCount = employees.filter((emp) => emp.departmentId === department.id).length
        return { ...department, employeeCount }
    })

    return (
        <>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
                    <p className="text-sm text-gray-600">Manage organizational departments and structure</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search departments..."
                            className="w-full pl-9 sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <AddDepartmentForm />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="col-span-3">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle>Departments</CardTitle>
                            <CardDescription>All departments in the organization</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DepartmentTable departments={departmentsWithCount} employees={employees} />
                        </CardContent>
                    </Card>
                </div>

                <DepartmentStatsCard departments={departmentsWithCount} />
                <DepartmentStructureCard />
            </div>
        </>
    )
}