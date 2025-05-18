"use client"

import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getDepartmentColorClass } from "@/lib/mock-data"
import { Employee } from "@/types"

interface EmployeeTableProps {
    employees: Employee[]
    sortField: string | null
    sortDirection: "asc" | "desc"
    onSort: (field: string) => void
}

export default function EmployeeTable({
    employees,
    sortField,
    sortDirection,
    onSort,
}: EmployeeTableProps) {
    const getSortIcon = (field: string) => {
        if (sortField !== field) return null
        return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">
                            <button className="flex items-center font-medium" onClick={() => onSort("name")}>
                                Employee {getSortIcon("name")}
                            </button>
                        </TableHead>
                        <TableHead>
                            <button className="flex items-center font-medium" onClick={() => onSort("department")}>
                                Department {getSortIcon("department")}
                            </button>
                        </TableHead>
                        <TableHead>
                            <button className="flex items-center font-medium" onClick={() => onSort("position")}>
                                Position {getSortIcon("position")}
                            </button>
                        </TableHead>
                        <TableHead>
                            <button className="flex items-center font-medium" onClick={() => onSort("email")}>
                                Email {getSortIcon("email")}
                            </button>
                        </TableHead>
                        <TableHead>
                            <button className="flex items-center font-medium" onClick={() => onSort("status")}>
                                Status {getSortIcon("status")}
                            </button>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((employee) => (
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
    )
}