"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Trash, Users, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DepartmentWithCount, Employee } from "@/types"
import { getDepartmentColorClass } from "@/lib/mock-data"

interface DepartmentTableProps {
    departments: DepartmentWithCount[]
    employees: Employee[]
}

export default function DepartmentTable({ departments, employees }: DepartmentTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {departments.map((department) => {
                    const departmentHead = employees.find((emp) => emp.id === department.headId)

                    return (
                        <TableRow key={department.id}>
                            <TableCell>
                                <Badge className={getDepartmentColorClass(department.code)}>{department.name}</Badge>
                            </TableCell>
                            <TableCell>{department.code}</TableCell>
                            <TableCell className="max-w-xs truncate">{department.description}</TableCell>
                            <TableCell>
                                {departmentHead ? (
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage
                                                src={`/placeholder.svg?height=24&width=24&text=${departmentHead.firstName[0]}${departmentHead.lastName[0]}`}
                                                alt={`${departmentHead.firstName} ${departmentHead.lastName}`}
                                            />
                                            <AvatarFallback className="text-xs">
                                                {departmentHead.firstName[0]}
                                                {departmentHead.lastName[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>
                                            {departmentHead.firstName} {departmentHead.lastName}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500">Not assigned</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <span>{department.employeeCount}</span>
                                </div>
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
                                        <DropdownMenuItem>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Department
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Users className="mr-2 h-4 w-4" />
                                            Assign Department Head
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600">
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete Department
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}