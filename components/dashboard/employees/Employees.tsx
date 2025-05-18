
"use client"

import { useState, useMemo } from "react"
import { employees } from "@/lib/mock-data"
import EmployeeFilters from "./EmployeeFilters"
import EmployeeTable from "./EmployeeTable"
import EmployeePagination from "./EmployeePagination"

export default function Employees() {
    const [sortField, setSortField] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const filteredEmployees = useMemo(() => {
        let result = [...employees]

        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            result = result.filter(
                (employee) =>
                    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(term) ||
                    employee.email.toLowerCase().includes(term) ||
                    employee.position.title.toLowerCase().includes(term) ||
                    employee.department?.name.toLowerCase().includes(term),
            )
        }

        if (selectedDepartment !== "all") {
            result = result.filter((employee) => employee.department?.code === selectedDepartment)
        }

        if (sortField) {
            result.sort((a, b) => {
                let valueA, valueB

                switch (sortField) {
                    case "name":
                        valueA = `${a.firstName} ${a.lastName}`
                        valueB = `${b.firstName} ${b.lastName}`
                        break
                    case "department":
                        valueA = a.department?.name || ""
                        valueB = b.department?.name || ""
                        break
                    case "position":
                        valueA = a.position.title
                        valueB = b.position.title
                        break
                    case "email":
                        valueA = a.email
                        valueB = b.email
                        break
                    case "status":
                        valueA = a.isActive ? "Active" : "Inactive"
                        valueB = b.isActive ? "Active" : "Inactive"
                        break
                    default:
                        return 0
                }

                const comparison = valueA.localeCompare(valueB)
                return sortDirection === "asc" ? comparison : -comparison
            })
        }

        return result
    }, [employees, searchTerm, selectedDepartment, sortField, sortDirection])

    const paginatedEmployees = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredEmployees.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredEmployees, currentPage, itemsPerPage])

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

    return (
        <>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
                    <p className="text-sm text-gray-600">View and manage all employees in your organization</p>
                </div>

                <EmployeeFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedDepartment={selectedDepartment}
                    onDepartmentChange={setSelectedDepartment}
                />
            </div>

            <div className="rounded-xl glass shadow-lg">
                <EmployeeTable
                    employees={paginatedEmployees}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                />

                <EmployeePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    )
}