"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Download, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/app/layouts/dashboard-layout"
import { employees, departments, getDepartmentColorClass } from "@/lib/mock-data"
import { AddEmployeeForm } from "./add-employee-form"

export default function EmployeesPage() {
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

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let result = [...employees]

    // Filter by search term
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

    // Filter by department
    if (selectedDepartment !== "all") {
      result = result.filter((employee) => employee.department?.code === selectedDepartment)
    }

    // Sort
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

  // Paginate employees
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredEmployees.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredEmployees, currentPage, itemsPerPage])

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Directory</h1>
          <p className="text-sm text-gray-600">View and manage all employees in your organization</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employees..."
              className="w-full pl-9 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
      </div>

      <div className="rounded-xl glass shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <button className="flex items-center font-medium" onClick={() => handleSort("name")}>
                    Employee {getSortIcon("name")}
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center font-medium" onClick={() => handleSort("department")}>
                    Department {getSortIcon("department")}
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center font-medium" onClick={() => handleSort("position")}>
                    Position {getSortIcon("position")}
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center font-medium" onClick={() => handleSort("email")}>
                    Email {getSortIcon("email")}
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center font-medium" onClick={() => handleSort("status")}>
                    Status {getSortIcon("status")}
                  </button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40&text=${employee.firstName[0]}${employee.lastName[0]}`}
                          alt={`${employee.firstName} ${employee.lastName}`}
                        />
                        <AvatarFallback>
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{employee.employeeId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {employee.department && (
                      <Badge variant="outline" className={getDepartmentColorClass(employee.department.code)}>
                        {employee.department.name}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{employee.position.title}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        employee.isActive
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }
                    >
                      {employee.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                        <DropdownMenuItem>View in Organogram</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          {employee.isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border-t border-gray-200 p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNumber}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pageNumber)
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DashboardLayout>
  )
}
